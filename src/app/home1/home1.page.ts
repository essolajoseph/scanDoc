import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-home1',
  templateUrl: './home1.page.html',
  styleUrls: ['./home1.page.scss'],
})
export class Home1Page implements OnInit{
  donneesRecus: any;
  user: any;
  constructor(private router:Router) { }

  ngOnInit() {
    this.donneesRecus= history.state;
    this.user=this.donneesRecus;
   
  }
  goToSubject(){

  }
}
