import { DatabaseProvider } from './../../providers/database/database';
import { SelecionaFilialProvider } from './../../providers/seleciona-filial/seleciona-filial';
import { ListaProvider } from './../../providers/lista/lista';
import { ConfiguracaoProvider } from './../../providers/configuracao/configuracao';
import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, AlertController } from 'ionic-angular';
import { NovaListaPage } from './../nova-lista/nova-lista';
import { ListaPage } from './../lista/lista';
import * as $ from 'jquery';

@IonicPage()
@Component({
  selector: 'page-minha-lista',
  templateUrl: 'minha-lista.html',
})
export class MinhaListaPage {

  listas: any[] = [];
  showCheckbox = false;

  constructor(public navCtrl: NavController, private toast: ToastController, private listaProvider: ListaProvider,
    private filialProvider: SelecionaFilialProvider, public configuracaoProvider: ConfiguracaoProvider,
    public alertCtrl: AlertController) {
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
    let val = valor_gastar.toString().replace('.', '');
    val = val.replace(',', '.');

    this.navCtrl.push(ListaPage, { idLista: id, titulo: descricao, valor_gastar: val });
  }

  public excluirListaCompra(id: number) {
    this.listaProvider.remove(id);
    this.listarCompras();
  }

  public deletarRegistros() {
    if (!this.showCheckbox) {
      this.showCheckbox = true;
      return true;
    }

    let checkbox = $('ion-checkbox div.checkbox-checked');
    let ids: any[] = [];

    if (checkbox.length > 0) {
      const confirm = this.alertCtrl.create({
        title: 'Atenção!',
        message: 'Realmente deseja excluir a(s) lista(s)?',
        buttons: [
          {
            text: 'Não',
            handler: () => {
              $.each(checkbox, function (key, value) {
                $(value).click();
              });
            }
          },
          {
            text: 'Sim',
            handler: () => {
              $.each(checkbox, function (key, value) {
                ids.push($(value).parent().attr('id'));
              });

              for (var i = 0; i < ids.length; i++) {
                this.excluirListaCompra(ids[i]);
              }

              this.listarCompras();
            }
          }
        ]
      });
      confirm.present();
    } else {
      this.showCheckbox = false;
    }
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

  public ngAfterViewInit() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'none';
      });
    }
  }

  public ngOnDestroy() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'flex';
      });
    }
  }


}
