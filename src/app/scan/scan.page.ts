import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  scannedData: any;
  encodedData?: '';
  encodeData: any;
  inputData: any;
  butonAuth?: boolean;
  buton?:boolean;
  info: any;
  donneesRecus: any;
  typeDoc:any;
  constructor(private barcodeScanner: BarcodeScanner,private http: HttpClient,public loadingController: LoadingController,private navController: NavController,private alertController:  AlertController) { }
  ngOnInit(){
    this.butonAuth=false;
    this.buton=false;
  }
  scanBarcode() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 0,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scannedData = barcodeData.text;
      let formData=new FormData();
      formData.append('data',this.scannedData);
      const url = 'http://192.168.43.108:8000/api/decode';
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      this.http.post(url, formData, { headers }).subscribe((response:any)=> {
        console.log('Les donnees été envoyées avec succès',response);
        if(response.statut==200){
          this.donneesRecus=response;
          this.butonAuth=true;
          this.buton=false;
          this.typeDoc=response.type;
          this.afficherAlerte();
        }
        else if(response.statut==400){
          this.butonAuth=false;
          this.buton=true;
          console.log(response.statut);
        }
        else if(response.statut==402){
          alert('Document ou Qr code non Reconnu');
          this.butonAuth=false;
          this.buton=false;
        }
      }
      );
    }).catch(err => {
      console.log('Error', err);
    });
  }
  createBarcode() {
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.inputData).then((encodedData) => {
      console.log(encodedData);
      this.encodedData = encodedData;
    }, (err) => {
      console.log('Error occured : ' + err);
    });
  }

  sendReceiveData(){
    this.butonAuth=false;
    this.buton=false;
    if(this.typeDoc=='releve'){
     this.navController.navigateForward('/releve', { state: this.donneesRecus }); 
    }
    else if(this.typeDoc=='attest'){
      this.navController.navigateForward('/attestion', { state: this.donneesRecus }); 
    }
    console.log(this.typeDoc);

   
  }

  
async afficherAlerte() {
  const alerte = await this.alertController.create({
    header: 'Information d\'entete lues sur le Qr code',
    message: 'Nom : ' + this.donneesRecus.etudiant.nom+'\nPrenom : ' + this.donneesRecus.etudiant.prenom+'\n'+'Né(e) le : ' + this.donneesRecus.etudiant.date_naissance+'\n'+'Matricule : ' + this.donneesRecus.releve.etudiant+'\n'+'Niveau : ' + this.donneesRecus.releve.niveau+'\n'+'Filiere : ' + this.donneesRecus.releve.filiere+'\n'+'Année Académiques : ' + this.donneesRecus.releve.anneeAcademique,
    buttons: ['OK']
  });
  await alerte.present();
}

}
