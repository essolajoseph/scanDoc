import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../api/data.service';
import { Observable, tap } from 'rxjs';
import { Releves } from 'src/models/data.model';
import { LoadingController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import * as Pica from 'pica';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {


  constructor(private camera: Camera) {}


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  async captureImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
  
    try {
      const imageData = await this.camera.getPicture(options);
      await this.modifyImage(imageData);
    } catch (error) {
      console.error(error);
    }
  }
  
  async modifyImage(imageUri: string) {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    img.onload = async () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
  
      const pica = new Pica();
      // const result = await pica.resize(bri);
  
      // Utilisez "result" qui contient l'image modifiée
    };
    
    img.src = imageUri;
  }
  
  




 
}
