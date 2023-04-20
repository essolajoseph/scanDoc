import { Component, OnInit } from '@angular/core';
import { OrthographeService } from '../api/text-dection.service';
import { HttpClient } from '@angular/common/http';
import { GetInformationService } from '../api/get-information.service';
import { Information } from 'src/models/information.model';

@Component({
  selector: 'app-correction',
  templateUrl: './correction.page.html',
  styleUrls: ['./correction.page.scss'],
})
export class CorrectionPage  {
  
  texte = 'REPUBLIQUE DU CAMEROUN Paix Travail Patrie REPUBLIC OF CAMEROON Peace Work Fatherland UNIVERSITE DE YAOUNDE I UNIVERSITY OF YAOUNDE I FACULTE DES SCIENCES BP/P Box 812 Yoounde-CAMEROUN / Tel:222 234 496 / Email: diplome@facsciences.uyl.em RELEVE DE NOTES/TRANSCRIPT N°:00097/EDG/L2/FS/ICT/222122 Noms et Prénoms : EZO\'O DAVID GAEL Surname and Name Matricule : 20R2198 Né(e) le : 04/08/2001 A : Registration N\' : Born on : At AKOM 2 Domaine : SCIENCES MATHEMATIQUES ET INFORMATIQUES Domain Niveau : LICENCE 2 Filière : INFORMATION AND COMMUNICATION TECHNOLOGY FOR DEVELOPMENT Level Discipline Spécialité : Année Académique :2021/2022 Option : Academic Year Code UE Credit Moy Mention Semestre Annee Decision Intitulé de l\'UE/UE Title Credit 100 Grade Semester Year Decision ENGL303 ENGLISH n 1 50.50 C I 2022 CA KT201 INTRODUCTION TO SOFTWARE ENGENFERING 6 83.00 A I 2022 CA ICT202 SOFTW ARE DEVELOPMENT FOR MOBILES DEVICES 5 77.75 A- 2 2022 CA SCT203 DATABASE SYSTEMS 6 69.00 B 1 2022 CA ICT204 INTRODUCTION TO OPERATING SYSTEM 5 90.25 A 2 2022 CA ICT205 INTRODUCTION to PROGRAMMING IN NET 5 81.00 A 1 2022 CA ICT206 INTRODUCTION TO COMPUTER NETWORK 5 62.00 B. 2 2022 CA KT207 SOFTWARE DEVELOPMENT INJAVATE 5 82.75 A I 2022 CA ICT200 COMPUTER ARCHITECTURE 5 78.00 A. 4 2022 CA ICT210 DATANASE PROGRAMMING 5 75.00 A. 2 2022 CA KIRIS INTRODUCTION TO COMPUTER NETWORKING 5 55.75 C+ I 2022 CA ICT210 NETWORK ADMINISTRATION 5 68.00 B 2 2022 CA Crédits Capitalisés : 60/60 (100,00%) Moyenne Générale Pondérée (MGP): 3.39/4 Légende CA Capitalist Décision ADMIS CANT Comitalisi Non Transfirible NC Nan Capitalise O M Tentine POIRIS A 421 T rechier BICH Parrship all chee DU Yapunde le 2.1 DEC 2022 Chef de Département Le Président du Jury Head of Department The President of the Jury Nu MS. ...';
  erreurs:any;
  dictionnaire?: Set<string>;
  constructor(private orthographeService: OrthographeService,private http: HttpClient, private getInfo:GetInformationService) {
    this.http.get<string[]>('../../assets/dictionnaire/dictionnaire.json').subscribe(mots => {
      this.dictionnaire = new Set<string>(mots);
      console.log(this.dictionnaire);
    });
  }

  verifierTexte() {
    this.erreurs = this.orthographeService.corrigerTexte(this.texte);
    console.log(this.erreurs);
  }

  extraireInformations() {
  let info:Information=this.getInfo.extraireInformations(this.texte);
  console.log(info);
 }
 
}
