import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetInformationService } from '../api/get-information.service';
import { Information } from 'src/models/information.model';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
// import { DocumentScanner, DocumentScannerOptions } from '@ionic-native/document-scanner/ngx';



@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage {
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
  send?: boolean;
  constructor(private camera: Camera,
    private getInfo:GetInformationService,
    private http: HttpClient,
    public loadingController: LoadingController,
    private navController: NavController,
    private webview: WebView,
    // private documentScanner: DocumentScanner,
    // private documentScanner: DocumentScanner,
    private alertController:  AlertController) {

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
        this.send=true;
      }, (err) => {
        console.log(err);
      });
      // await this.sendImageToApi(imageData);
    } catch (err) {
      console.log(err);
    }
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
    this.send=true;
   }, (err) => {
     console.log(err);
   });
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
    }
    else if(response.message=='no'){
        this.butonAuth=false;
        this.buton=true;    
    }
    else if(response.message=='ls'){
       this.afficherAlerte('La lumisoté de votre image trop elevée, veillez capturer une photo avec une lumisité moyenne');
    }
    else if(response.message=='li'){
      this.afficherAlerte('La lumisoté de votre image trop abaissée, veillez capturer une photo avec une lumisité moyenne');
    }
    else if(response.message=='pas'){
      this.afficherAlerte('L\'image  n\'est pas bien capturée \nVeiller très bien capturer le document');
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
  this.buton=false;
  this.butonAuth=false; 
}

async afficherAlerte(message:string) {
  const alerte = await this.alertController.create({
    header: 'Message',
    message: message,
    buttons: ['OK']
  });
  await alerte.present();
}

// test(){
//    let opts: DocumentScannerOptions = {};
//    this.documentScanner.scanDocument(opts)
//   .then((res: string) => console.log(res))
//   .catch((error: any) => console.error(error));
// }

}
