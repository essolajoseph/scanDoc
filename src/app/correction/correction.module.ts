import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorrectionPageRoutingModule } from './correction-routing.module';

import { CorrectionPage } from './correction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorrectionPageRoutingModule
  ],
  declarations: [CorrectionPage]
})
export class CorrectionPageModule {}
