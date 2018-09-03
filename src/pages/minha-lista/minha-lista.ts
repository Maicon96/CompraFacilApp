import { ListaProvider } from './../../providers/lista/lista';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NovaListaPage } from './../nova-lista/nova-lista';
import { ListaPage } from './../lista/lista';

@IonicPage()
@Component({
  selector: 'page-minha-lista',
  templateUrl: 'minha-lista.html',
})
export class MinhaListaPage {

  listas: any[] = [];

  constructor(public navCtrl: NavController, private toast: ToastController, private listaProvider: ListaProvider) {
  }

  ionViewDidEnter() {
    this.listarCompras();
  }

  public listarCompras() {
    this.listaProvider.getAll()
      .then((result: any[]) => {
        this.listas = result;
      })
  }

  public editarListaCompra(id: number, descricao: string) {
    this.navCtrl.push(ListaPage, {idLista: id, titulo: descricao});
  }

  public excluirListaCompra(id: number) {
    this.listaProvider.remove(id);
    this.listarCompras();
  }

  public chamaNovaLista() {
    this.navCtrl.push(NovaListaPage);
  }

}
