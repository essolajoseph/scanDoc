import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-releve',
  templateUrl: './releve.page.html',
  styleUrls: ['./releve.page.scss'],
})
export class RelevePage implements OnInit {
  donneesRecus:any;
  releve:any;
  notes:any;
  etudiant: any;
  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.donneesRecus= history.state;
      this.notes=this.donneesRecus.notes;
      this.releve=this.donneesRecus.releve;
      this.etudiant=this.donneesRecus.etudiant;
      // alert(this.etudiant.nom);
  }
  
}
