import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-attestion',
  templateUrl: './attestion.page.html',
  styleUrls: ['./attestion.page.scss'],
})
export class AttestionPage implements OnInit {
  donneesRecus:any;
  releve:any;
  notes:any;
  etudiant: any;
  constructor() { }

  ngOnInit() {
    this.donneesRecus= history.state;
    this.notes=this.donneesRecus.notes;
    this.releve=this.donneesRecus.releve;
    this.etudiant=this.donneesRecus.etudiant;
  }

}
