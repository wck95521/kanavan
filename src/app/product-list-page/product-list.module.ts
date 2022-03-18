import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductListPageRoutingModule } from './product-list-routing.module';
import { ProductListPage } from './product-list.page';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductListPageRoutingModule,
  ],
  declarations: [ProductListPage],
})
export class ProductListPageModule {}
