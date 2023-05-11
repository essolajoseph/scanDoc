import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { TextractClient, AnalyzeDocumentCommand } from '@aws-sdk/client-textract';
import { from } from 'rxjs';
import { OrthographeService } from '../api/text-dection.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetInformationService } from '../api/get-information.service';
import { Information } from 'src/models/information.model';
import { LoadingController, NavController } from '@ionic/angular';
import { MyserviceService } from '../api/myservice.service';
import * as CryptoJS from 'crypto-js';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { DocumentScanner, DocumentScannerOptions } from '@ionic-native/document-scanner/ngx';


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
  info?:Information;
  base64:any;
  donneesRecus:any;
  butonAuth=false;
  buton=false;
  data?: string;
  photo?: string;
  selectedImage?: string;
  constructor(private camera: Camera,private getInfo:GetInformationService,private orthographeService: OrthographeService,private http: HttpClient,public loadingController: LoadingController,private myService:MyserviceService,private navController: NavController,private webview: WebView,private documentScanner: DocumentScanner) {
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
      const imageData = await this.camera.getPicture(options).then((imageData) => {
        let finalImage=this.webview.convertFileSrc(imageData);
        this.photo=finalImage;
       this.base64='data:image/jpeg;base64,'+imageData; 
        this.uploadPhoto();
      }, (err) => {
        console.log(err);
      });
      // await this.sendImageToApi(imageData);
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
      console.log(text);
      let info=this.getInfo.extraireInformations(text);
      if(info!=null){
        loading.dismiss();
      console.log("Filiere :"+info.filiere+"\n faculte :"+info.faculte+"\n matricule :"+info.matricule+"\n niveau :"+info.niveau+"\nnumero du releve :"+info.numeroReleve+"\nannee Scolaire :"+info.annee+"\nmgp :"+info.mgp+"\ndecision :"+info.decision+"\n");
      //  this.sendData(info);
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
      // await this.sendImageToApi(libraryImage);
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
  return await this.camera.getPicture(options).then((imageData) => {
    let finalImage=this.webview.convertFileSrc(imageData);
    this.photo=finalImage;
    this.base64='data:image/jpeg;base64,'+imageData;
     this.uploadPhoto();
   }, (err) => {
     console.log(err);
   });;
}
    
  async uploadPhoto() {
  const loading = await this.loadingController.create({
    message: 'Please wait...',
  });
  await loading.present();
  const url = 'http://192.168.43.108:8000/api/endpoint';
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');
  let formData=new FormData();
  formData.append('file',this.base64);
  this.http.post(url, formData, { headers }).subscribe((response:any)=> {
    console.log('La photo a été envoyée avec succès',response);
    loading.dismiss();
    if(response.message=='ok') {
      this.donneesRecus=response;
      this.butonAuth=true;
      this.buton=false;
      // alert(response.text);
    }else{
      if(response.message=='no'){
        this.butonAuth=false;
        this.buton=true;
      }
    }
   
  }, error => {
    console.log('Erreur lors de l\'envoi de la photo', error);
    this.buton=true;
    this.butonAuth=false;
    loading.dismiss();
  });


}

sendReceiveData(){
  this.navController.navigateForward('/releve', { state: this.donneesRecus });   
}

}
