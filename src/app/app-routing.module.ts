import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'market-place',
    loadChildren: () =>
      import('./market-place-page/market-place.module').then(
        (m) => m.MarketPlacePageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login-page/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'product-list',
    loadChildren: () =>
      import('./product-list-page/product-list.module').then(
        (m) => m.ProductListPageModule
      ),
  },
  {
    path: 'mining',
    loadChildren: () =>
      import('./mining-page/mining.module').then((m) => m.MiningPageModule),
  },
  {
    path: 'product-preview',
    loadChildren: () =>
      import('./product-preview-page/product-preview.module').then(
        (m) => m.ProductPreviewPageModule
      ),
  },
  {
    path: 'add-product',
    loadChildren: () =>
      import('./add-product-page/add-product.module').then(
        (m) => m.AddProductPageModule
      ),
  },
  {
    path: 'face-detection',
    loadChildren: () =>
      import('./face-detection-page/face-detection.module').then(
        (m) => m.FaceDetectionPageModule
      ),
  },
  {
    path: 'id-card-ocr',
    loadChildren: () =>
      import('./id-card-ocr-page/id-card-ocr.module').then(
        (m) => m.IdCardOcrPageModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register-page/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings-page/settings.module').then(
        (m) => m.SettingsPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
