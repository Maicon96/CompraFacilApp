import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromocoesPage } from './promocoes';

@NgModule({
  declarations: [
    PromocoesPage,
  ],
  imports: [
    IonicPageModule.forChild(PromocoesPage),
  ],
})
export class PromocoesPageModule {}
