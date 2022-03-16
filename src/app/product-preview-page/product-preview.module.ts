import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductPreviewPageRoutingModule } from './product-preview-routing.module';
import { ProductPreviewPage } from './product-preview.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    SwiperModule,
    IonicModule,
    ProductPreviewPageRoutingModule,
  ],
  declarations: [ProductPreviewPage],
})
export class ProductPreviewPageModule {}
