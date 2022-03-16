import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { IdCardOcrPageRoutingModule } from './id-card-ocr-routing.module';

import { IdCardOcrPage } from './id-card-ocr.page';

@NgModule({
  imports: [CommonModule, IonicModule, IdCardOcrPageRoutingModule],
  declarations: [IdCardOcrPage],
})
export class IdCardOcrPageModule {}
