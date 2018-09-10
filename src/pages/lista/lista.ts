import { ProdutoProvider } from './../../providers/produto/produto';
import { ModalProdutoPage } from './../modal-produto/modal-produto';
import { ModalBuscarProdutoPage } from './../modal-buscar-produto/modal-buscar-produto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

  produtos: any[] = [];
  idLista: number;
  titulo: string;
  valor_total: number = 0;
  valor_gastar: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private produtoProvider: ProdutoProvider,
    private modalCtrl: ModalController, private barcodeScanner: BarcodeScanner, private toast: ToastController) {
    this.idLista = this.navParams.get("idLista");
    this.titulo = this.navParams.get("titulo");    
    this.valor_gastar = this.navParams.get("valor_gastar")    
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

        for (var i = 0; i < result.length; i++) {       
          this.valor_total += result[i].preco * result[i].quantidade;                             
        }
        
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

  editarProduto(idProduto: number, descricao: string, preco:number, quantidade: number) {
    this.modalCtrl.create(ModalProdutoPage, {idProduto: idProduto, idLista: this.idLista, 
      descricao: descricao, preco: preco, quantidade: quantidade, update: true}).present();
  }

  abrirModalProduto() {
    this.modalCtrl.create(ModalProdutoPage, {idLista: this.idLista}).present();
  }

  abrirModalBuscarProduto() {
    this.modalCtrl.create(ModalBuscarProdutoPage, {idLista: this.idLista}).present();
  }
  
  lerBarcode() {
    this.barcodeScanner.scan().then(barcodeData => {
      let resposta: string = JSON.stringify(barcodeData);

      console.log('maicon - barcode = ' + resposta);
      this.toast.create({
        message: 'maicon - barcode = ' + resposta,
        duration: 5000,
        position: 'top' 
      }).present();

     }).catch(e => {
         console.log('maicon - Error', e);
     });
  }
  
}
