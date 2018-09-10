import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-modal-buscar-produto',
  templateUrl: 'modal-buscar-produto.html',
})
export class ModalBuscarProdutoPage {

  produtos: Array<{descricao: string}>;
  allProdutos: any;
  queryText: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.queryText = '';

    this.produtos = [
      {descricao: 'Coca cola'},
      {descricao: 'Doritos'},
      {descricao: 'Leite'},
      {descricao: 'Chocolate nestle'}      
    ]

    this.allProdutos = this.produtos;
  }

  fecharModalProduto() {
    this.viewCtrl.dismiss();
  }

  filtrarProduto(prod: any) {
    let val = prod.target.value;

    if (val && val.trim() != '') {
      this.produtos = _.values(this.allProdutos);
      this.produtos = this.produtos.filter((produto) => {
        return (produto.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    } else {
      this.produtos = this.allProdutos;
    }
  }


}
