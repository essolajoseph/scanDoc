import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanocrPageRoutingModule } from './scanocr-routing.module';

import { ScanocrPage } from './scanocr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanocrPageRoutingModule
  ],
  declarations: [ScanocrPage]
})
export class ScanocrPageModule {}
