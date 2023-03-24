import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
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
  constructor(private barcodeScanner: BarcodeScanner) { }
  ngOnInit() {
 
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
    }).catch(err => {
      console.log('Error', err);
    });
  }

}
