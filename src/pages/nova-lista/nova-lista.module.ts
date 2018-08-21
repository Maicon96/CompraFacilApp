import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovaListaPage } from './nova-lista';

@NgModule({
  declarations: [
    NovaListaPage,
  ],
  imports: [
    IonicPageModule.forChild(NovaListaPage),
  ],
})
export class NovaListaPageModule {}
