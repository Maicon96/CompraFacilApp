import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListaProvider } from './../../providers/lista/lista';

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

  produtos: any[] = [];
  idLista: number;
  titulo: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private listaProvider: ListaProvider) {
    this.idLista = this.navParams.get("idLista"); 
    this.titulo = this.navParams.get("titulo");  
  }

  ionViewDidEnter(idLista: number) {
    this.listarProdutos(idLista);
  }

  listarProdutos(idLista: number) {
    this.listaProvider.getAll()
      .then((result: any[]) => {
        this.produtos = result;
      })
  }

  excluirProduto(id: number) {

  }

  alterarProduto(id: number) {

  }

}
