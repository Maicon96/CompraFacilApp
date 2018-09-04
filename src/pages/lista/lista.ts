import { ProdutoProvider } from './../../providers/produto/produto';
import { ModalProdutoPage } from './../modal-produto/modal-produto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

  produtos: any[] = [];
  idLista: number;
  titulo: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private produtoProvider: ProdutoProvider,
    private modalCtrl: ModalController) {
    this.idLista = this.navParams.get("idLista");
    this.titulo = this.navParams.get("titulo");
  }

  ionViewDidLoad() {
    this.listarProdutos(this.idLista);
  }

  ionViewDidEnter() {
    this.listarProdutos(this.idLista);
  }

  listarProdutos(idLista: number) {
    this.produtoProvider.getAll(idLista)
      .then((result: any[]) => {
        this.produtos = result;
      })
      .catch((e) => console.error("erro ao buscar produtos: " + e));
  }

  excluirProduto(id: number) {
      this.produtoProvider.remove(id)
      .then(() => {
        this.listarProdutos(this.idLista);    
      })
      .catch((e) => console.error("erro ao excluir produto: " + e));     
  }

  alterarProduto(id: number) {

  }

  abrirModalProduto() {
    this.modalCtrl.create(ModalProdutoPage, {idLista: this.idLista}).present();
  }

}
