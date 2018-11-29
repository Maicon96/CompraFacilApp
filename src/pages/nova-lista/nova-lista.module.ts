import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovaListaPage } from './nova-lista';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    NovaListaPage,
  ],
  imports: [
    IonicPageModule.forChild(NovaListaPage),
    BrMaskerModule
  ],
})
export class NovaListaPageModule {}
