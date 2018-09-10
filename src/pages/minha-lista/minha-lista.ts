import { SelecionaFilialProvider } from './../../providers/seleciona-filial/seleciona-filial';
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

  constructor(public navCtrl: NavController, private toast: ToastController, private listaProvider: ListaProvider,
    private filialProvider: SelecionaFilialProvider) {
  }

  ionViewDidEnter() {
    this.listarCompras();
  }

  public listarCompras() {
    this.filialProvider.getLasted()      
      .then((result: any) => {
        this.listaProvider.getAll(result)
          .then((resultLista: any[]) => {            
            this.listas = resultLista;
          })
          .catch((e) => console.error("erro ao buscar listas: " + e));
      })    
  }

  public editarListaCompra(id: number, descricao: string, valor_gastar: number) {
    this.navCtrl.push(ListaPage, { idLista: id, titulo: descricao, valor_gastar: valor_gastar});
  }

  public excluirListaCompra(id: number) {
    this.listaProvider.remove(id);
    this.listarCompras();
  }

  public chamaNovaLista() {
    this.navCtrl.push(NovaListaPage);
  }

}
