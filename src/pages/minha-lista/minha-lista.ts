import { SelecionaFilialProvider } from './../../providers/seleciona-filial/seleciona-filial';
import { ListaProvider } from './../../providers/lista/lista';
import { ConfiguracaoProvider } from './../../providers/configuracao/configuracao';
import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
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
    private filialProvider: SelecionaFilialProvider, public configuracaoProvider: ConfiguracaoProvider) {
  }

  ionViewDidEnter() {
    this.listarCompras();
  }

  public listarCompras() {

    this.listaProvider.getAll(parseInt(this.configuracaoProvider.getConfigFilial()))
      .then((resultLista: any[]) => {
        this.listas = resultLista;
      })
      .catch((e) => console.error("erro ao buscar listas: " + e));
      
  }

  public editarListaCompra(id: number, descricao: string, valor_gastar: number) {
    this.navCtrl.push(ListaPage, { idLista: id, titulo: descricao, valor_gastar: valor_gastar });
  }

  public excluirListaCompra(id: number) {
    this.listaProvider.remove(id);
    this.listarCompras();
  }

  public editarDadosLista(id: number, idFilial: number, nome: string, valor_total: number,
    valor_gastar: number, data_criacao: string) {

    console.log("maicon - minha - " + idFilial);

    this.navCtrl.push(NovaListaPage, {
      idLista: id, idFilial: idFilial, nome: nome, valor_total: valor_total,
      valor_gastar: valor_gastar, data_criacao: data_criacao, update: true
    });
  }

  public chamaNovaLista() {
    this.navCtrl.push(NovaListaPage);
  }

  ngAfterViewInit() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'none';
      });
    }
  }

  ngOnDestroy(){
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'flex';
      });
    }
  }

}
