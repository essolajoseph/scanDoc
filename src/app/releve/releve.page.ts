import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-releve',
  templateUrl: './releve.page.html',
  styleUrls: ['./releve.page.scss'],
})
export class RelevePage implements OnInit {
  activatedRoute: any;
  myId: any;
  user?: string | null;
  matricule?: string | null;

  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
 
    if(this.route.snapshot.queryParamMap.get('matricule')=='19G2521'){
     this.user= 'Kanou Foku Keni Steve'
      this.matricule=this.route.snapshot.queryParamMap.get('matricule');
    }
    else if(this.route.snapshot.queryParamMap.get('matricule')=='20R2198'){
      this.user= 'David Ezo\'o'
      this.matricule='20R2198';
    }
    console.log(this.user);
  }
  
}
