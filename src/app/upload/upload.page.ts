import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { TextractClient, AnalyzeDocumentCommand } from '@aws-sdk/client-textract';
import { from } from 'rxjs';
import { OrthographeService } from '../api/text-dection.service';
import { HttpClient } from '@angular/common/http';
import { GetInformationService } from '../api/get-information.service';
import { Information } from 'src/models/information.model';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage {
  client: TextractClient;
  image: any;
  texte = '';
  erreurs:any;
  dictionnaire?: Set<string>;

  constructor(private camera: Camera,private getInfo:GetInformationService,private orthographeService: OrthographeService,private http: HttpClient,public loadingController: LoadingController) {
    this.client = new TextractClient({
      region: "us-east-1",
      credentials: {
        accessKeyId: "AKIAZDHOG23RVZA73SMG",
        secretAccessKey: "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"
      }
    });

    this.http.get<string[]>('../../assets/dictionnaire/dictionnaire.json').subscribe(mots => {
      this.dictionnaire = new Set<string>(mots);
      console.log(this.dictionnaire);
    });
  }



  async takePicture() {
    try {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
      };
      const imageData = await this.camera.getPicture(options);
      await this.sendImageToApi(imageData);
    } catch (err) {
      console.log(err);
    }
  }

  async sendImageToApi(imageData: string) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    const buffer = this.base64ToArrayBuffer(imageData);
    const bytes = new Uint8Array(buffer);
    alert(bytes);
    const params = {
      Document: {
        Bytes: bytes,
      },
      FeatureTypes: ['TABLES', 'FORMS'],
    };
    const command = new AnalyzeDocumentCommand(params);
  
    try {
      const response = await from(this.client.send(command)).toPromise();
      const textBlocks = response?.Blocks?.filter(b => b.BlockType === 'LINE') ?? [];
      const text = textBlocks.map(tb => tb.Text).join(' ');
      let info=this.getInfo.extraireInformations(text);
      if(info!=null){
        loading.dismiss();
        alert(info.numeroReleve);
        console.log(info)
      }
      
    } catch (err) {
      alert("Document pas clair!!!");
    }
  }
  
  base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  async addPhoto() {
    const libraryImage = await this.openLibrary();
      alert(libraryImage);
      await this.sendImageToApi(libraryImage);
}
async openLibrary() {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    targetWidth: 1000,
    targetHeight: 1000,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  };
  return await this.camera.getPicture(options);
}
}
