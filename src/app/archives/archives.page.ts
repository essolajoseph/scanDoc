import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.page.html',
  styleUrls: ['./archives.page.scss'],
})
export class ArchivesPage implements OnInit {
  image?: any;
  butonAuth?:boolean;
  imageUrl?: string;
  base64?: any;
  formData = {
    type: '',
    numero: '',
    matricule:'',
    niveau:'',
    annee:'',
  };
  constructor(
     private camera: Camera  ,
     private http: HttpClient,
     private alertController:AlertController,
     private loadingController:LoadingController,
     ) 
    {
    this.butonAuth=false;
  }

  ngOnInit() {

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
    this.base64='data:image/jpeg;base64,'+imageData; 
    this.butonAuth=true;
   }, (err) => {
     console.log(err);
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
        this.base64='data:image/jpeg;base64,'+imageData; 
        this.butonAuth=true;
      }, (err) => {
        console.log(err);
      });
  
    } catch (err) {
      console.log(err);
    }
  }
  async uploadPhoto() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    const url = 'http://192.168.43.109:8000/api/store';
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    if(this.formData.type==''|| this.formData.numero==''||this.formData.matricule==''||this.formData.annee==''||this.formData.niveau==''){
      alert("remplisser tous les champs!!!");
      loading.dismiss();
   }
   else{ 
    let formData=new FormData();
    formData.append('file',this.base64);
    formData.append('type',this.formData.type);
    formData.append('numero',this.formData.numero);
    formData.append('matricule',this.formData.matricule);
    formData.append('niveau',this.formData.niveau);
    formData.append('annee',this.formData.annee);
    this.http.post(url, formData, { headers }).subscribe((response:any)=> {
      console.log('La photo a été envoyée avec succès',response);
      loading.dismiss();
      if(response.statut==200) {
        this.afficherAlerte('document archivé!');
        this.formData.annee='';
        this.formData.matricule='';
        this.formData.niveau='';
        this.formData.type='';
        this.butonAuth=false;
      }
      else if(response.statut==400){
        this.afficherAlerte('Document non archivé !\nDocument non reconnu\nCapturer une image de relevé claire');
        this.base64='';
      }
      else{
        this.afficherAlerte('Le document existe déjà dans les archives!!!');
      }    
    }, error => {
      console.log('Erreur lors de l\'envoi de la photo', error);
      this.base64='';
      loading.dismiss();
    });
   }
     
    
  
  
  }

  
  async afficherAlerte(message:string) {
    const alerte = await this.alertController.create({
      header: 'Message',
      message: message,
      buttons: ['OK']
    });
    await alerte.present();
  }
 
}
