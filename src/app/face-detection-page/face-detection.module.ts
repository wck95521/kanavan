import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { FaceDetectionPageRoutingModule } from './face-detection-routing.module';

import { FaceDetectionPage } from './face-detection.page';

@NgModule({
  imports: [CommonModule, IonicModule, FaceDetectionPageRoutingModule],
  declarations: [FaceDetectionPage],
})
export class FaceDetectionPageModule {}
