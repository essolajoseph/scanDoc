import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttestionPageRoutingModule } from './attestion-routing.module';

import { AttestionPage } from './attestion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttestionPageRoutingModule
  ],
  declarations: [AttestionPage]
})
export class AttestionPageModule {}
