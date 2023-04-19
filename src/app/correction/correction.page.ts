import { Component, OnInit } from '@angular/core';
import { OrthographeService } from '../api/text-dection.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-correction',
  templateUrl: './correction.page.html',
  styleUrls: ['./correction.page.scss'],
})
export class CorrectionPage  {
  
  texte = 'je seus m0lady a ktc201';
  erreurs:any;
  dictionnaire?: Set<string>;

  constructor(private orthographeService: OrthographeService,private http: HttpClient) {
    this.http.get<string[]>('../../assets/dictionnaire/dictionnaire.json').subscribe(mots => {
      this.dictionnaire = new Set<string>(mots);
      console.log(this.dictionnaire);
    });
  }

  verifierTexte() {
    this.erreurs = this.orthographeService.corrigerTexte(this.texte);
    console.log(this.erreurs);
  }
 
}
