import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, NavController } from '@ionic/angular';

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
  constructor(private barcodeScanner: BarcodeScanner,private http: HttpClient,public loadingController: LoadingController,private navController: NavController) { }
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
      let splitArray=this.scannedData.split(/\s+/);
      this.info={hache:splitArray[0],matricule:splitArray[1],niveau:splitArray[2]+" "+splitArray[3]};
      const url = 'http://192.168.43.109:8000/api/decode';
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      this.http.post(url, this.info, { headers }).subscribe((response:any)=> {
        console.log('Les donnees été envoyées avec succès',response);
        if(response.message=='ok'){
          this.donneesRecus=response;
          this.butonAuth=true;
          this.buton=false;
        }
        else if(response.message=='no'){
          this.butonAuth=false;
          this.buton=true;
        }
        else if(response.message=='no document'){
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
    this.navController.navigateForward('/releve', { state: this.donneesRecus }); 
  }

}
