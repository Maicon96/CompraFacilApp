import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalProdutoPage } from './modal-produto';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    ModalProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalProdutoPage),
    BrMaskerModule
  ],
})
export class ModalProdutoPageModule {}
