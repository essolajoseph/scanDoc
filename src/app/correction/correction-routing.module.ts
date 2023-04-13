import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorrectionPage } from './correction.page';

const routes: Routes = [
  {
    path: '',
    component: CorrectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorrectionPageRoutingModule {}
