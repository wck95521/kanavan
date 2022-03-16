import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductPreviewPage } from '../product-preview-page/product-preview.page';

const routes: Routes = [{ path: '', component: ProductPreviewPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductPreviewPageRoutingModule {}
