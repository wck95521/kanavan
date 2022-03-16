import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MiningPageRoutingModule } from './mining-routing.module';
import { MiningPage } from './mining.page';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MiningPageRoutingModule],
  declarations: [MiningPage],
})
export class MiningPageModule {}
