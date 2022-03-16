import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdCardOcrPage } from './id-card-ocr.page';

const routes: Routes = [{ path: '', component: IdCardOcrPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdCardOcrPageRoutingModule {}
