import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.page.html',
  styleUrls: ['./home2.page.scss'],
})
export class Home2Page implements OnInit {
  email?:string
  password?:string
  constructor( private alertController:  AlertController,private navController: NavController,private http: HttpClient,private loadingController:LoadingController) { }

  ngOnInit() {
  }
   
   async login(){
    if(this.email==null){
      this.afficherAlerte('Champ email  vide , Veillez remplir ce champ!');
     }
    else if(this.password==null){
      this.afficherAlerte('Champ password  vide , Veillez remplir ce champ!');
     }
    else{
      const loading = await this.loadingController.create({
        message: 'Please wait...',
      });
      await loading.present();
      let data={email:this.email, password:this.password}
      const url = 'http://192.168.43.108:8000/api/getUser';
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      this.http.post(url, data, { headers }).subscribe((response:any)=> {
        console.log('La photo a été envoyée avec succès',response);
        loading.dismiss();
         if(response.message=='ok'){
          this.afficherAlerte('Bienvenu(e) ' + response.user.name);
          this.navController.navigateForward('/home1', { state: response.user});
         } 
         else{
          this.afficherAlerte('Vous n\'avez aucune autorisation d\'authentifier un document');
         }     
      },
        error => {
          console.log('Erreur lors de l\'envoi des information', error);
          this.afficherAlerte('Erreur lors de l\'envoi des information');
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
