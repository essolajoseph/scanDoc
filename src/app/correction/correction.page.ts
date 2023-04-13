import { Component, OnInit } from '@angular/core';
import { OrthographeService } from '../api/text-dection.service';
import * as dictionnaire from '../../assets/dictionnaire/dictionnaire.json'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-correction',
  templateUrl: './correction.page.html',
  styleUrls: ['./correction.page.scss'],
})
export class CorrectionPage  {
  
  texte = 'je seus m0lady je laissb mpn ordin9teor je foqs kct2p1';
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
