import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalProdutoPage } from './modal-produto';

@NgModule({
  declarations: [
    ModalProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalProdutoPage),
  ],
})
export class ModalProdutoPageModule {}
