import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttestionPage } from './attestion.page';

const routes: Routes = [
  {
    path: '',
    component: AttestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttestionPageRoutingModule {}
