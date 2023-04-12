import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanocrPage } from './scanocr.page';

const routes: Routes = [
  {
    path: '',
    component: ScanocrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanocrPageRoutingModule {}
