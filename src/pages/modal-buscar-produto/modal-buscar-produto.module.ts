import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalBuscarProdutoPage } from './modal-buscar-produto';

@NgModule({
  declarations: [
    ModalBuscarProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalBuscarProdutoPage),
  ],
})
export class ModalBuscarProdutoPageModule {}
