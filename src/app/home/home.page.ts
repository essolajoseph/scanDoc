import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { DocumentScanner, DocumentScannerOptions } from '@ionic-native/document-scanner/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { MyserviceService } from '../api/myservice.service';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
   datas: any;
   data: any;
  photo: any;
  selectedImage: any;
  info = {name:"dumbresh", email: 'John@gmail.com',password:"123"};

  constructor(private http:HttpClient,private documentScanner: DocumentScanner, private webview: WebView,private camera:Camera,private myService: MyserviceService,private platform: Platform) {
     this.datas=this.http.get('http://192.168.43.108:8000/api/users').subscribe((data)=>{
      console.log(data);
     });
    console.log(this.datas);
  }
  ngOnInit(){
  
  }

  openSccanner() {
    let opts: DocumentScannerOptions = {sourceType : 1, fileName : "myfilename", quality : 1.0, returnBase64 : false};
    this.documentScanner.scanDoc(opts)
  .then((res: string) => {
    console.log(res)
    this.data = res;
    let finalImage=this.webview.convertFileSrc(res);
    this.photo=finalImage;
    this.selectedImage = `data:image/jpeg;base64,${finalImage}`;
  })
  .catch((error: any) => console.error(error));
  }

  getPicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
      let finalImage=this.webview.convertFileSrc(imageData);
      this.photo=finalImage;
      this.selectedImage = `data:image/jpeg;base64,${finalImage}`;
     let d= this.http.post('https://script-en-ligne.herokuapp.com/uploads.php',this.photo,{headers:{ 'Content-Type':  'application/json'}}).subscribe((response: any) => {
      alert(JSON.stringify(response));
    });
     
    }, () => {
    });
  }
   
  sendData() {
    this.myService.sendData(this.info).subscribe((response:any) => {
      console.log('Réponse du serveur:', response);
      alert(response.name);
    });
  }

 


}

