import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../api/data.service';
import { Observable, tap } from 'rxjs';
import { Releves } from 'src/models/data.model';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  scannedData: any;
  encodedData?: '';
  encodeData: any;
  inputData: any;
  success:boolean | undefined;
  data?:Observable<Releves[]>
  allData?:Observable<Releves[]>;
  buton=false;
  buto=false;
   text='';
   color="";
  test=["19G2521","20R2198","20U4660"];
  apiUrl='https://script-en-ligne.herokuapp.com/getUser.php'
  constructor(private barcodeScanner: BarcodeScanner,private http:HttpClient, private dataService:DataService, private loadindCrtl:LoadingController) { 
    // this.http.get('https://script-en-ligne.herokuapp.com/getUser.php').subscribe(()=>{
    //   console.log;
    // })
    console.log('bonjour');
  }
  ngOnInit() {
    this.buton=false;
    this.buto=false;
  }

  scanBarcode() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scannedData = barcodeData.text;
       if(this.scannedData=="20R2198" || this.scannedData=="19G2521")
     {  this.text='Document Authentique'
        this.color="sucess";
       this.buton=true;
       this.buto=false;
     }     
       else
      { this.text = 'Document non Authentique';
        this.color="danger";
        this.buton=false
        this.buto=true;
    }   
 
    }).catch(err => {
      console.log('Error', err);
    });
   
  }

    async verify(){
  //    if(this.scannedData!=''){
  //       const loading= await this.loadindCrtl.create({message:'Loading...'});
  //       loading.present();
  //      this.allData= this.dataService.getData().pipe(
  //       tap(
  //         data=>{
  //           loading.dismiss();
  //           return data;
  //         }
  //       )
  //      );
      
  //  this.allData.forEach(data =>{
  //    if(data[i].name==this.scannedData){
  //     this.success=true;
  //     this.danger=false;
  //    }
  //    else{
  //     this.success=false;
  //     this.danger=true;
  //     i++;
  //    }

  //  });
      
  //    }    

   let  bool=true;
   for(let i=0; i<this.test.length; i++){
      if(this.test[i]==this.scannedData){
        this.success=true;
     
        bool=false;
        break;
      }
   }
   if(bool==true){
    this.success=false;

   }

  }

  getdocument(){

  }
}
