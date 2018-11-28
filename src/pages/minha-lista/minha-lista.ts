import { DatabaseProvider } from './../../providers/database/database';
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
  modelo: any[] = [];
  showCheck = false;
  cont = 1;

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

  doRefresh(refresher) {    
    setTimeout(() => {      
      this.listarCompras();
      refresher.complete();
    }, 1000);
  }

  public editarListaCompra(id: number, descricao: string, valor_gastar: number) {
    this.navCtrl.push(ListaPage, { idLista: id, titulo: descricao, valor_gastar: valor_gastar });
  }

  public excluirListaCompra(id: number) {
    this.listaProvider.remove(id);
    this.listarCompras();
  }

  public excluir() {

    var result = this.cont / 2;

    if (result = 0) {      
      this.showCheck = false;
    }

    if (result = 1) {            
      this.showCheck = true;
    }

    console.log("maicon - aq");

    this.listas.forEach(function (lista) {

      console.log("maicon - lista " + lista.id);
      console.log("maicon - checked " + lista.checked);

      if (lista.checked) {
        this.modelo[lista.id] = lista.checked;

        this.listaProvider.remove(lista.id);
      }
    })

    this.cont++;
  }


  public editarDadosLista(id: number, idFilial: number, nome: string, valor_total: number,
    valor_gastar: number, data_criacao: string) {

    this.navCtrl.push(NovaListaPage, {
      idLista: id, nome: nome, valor_total: valor_total,
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

  ngOnDestroy() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'flex';
      });
    }
  }
  /*
    deleteMultipel(student) {
      let index = this.deleteSelected.indexOf(student);
      if (index !== -1) {
        this.deleteSelected.splice(index, 1);
      }
      else {
        this.deleteSelected.push(student);
      }
    }  */




}
