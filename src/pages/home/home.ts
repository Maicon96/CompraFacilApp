import { PerfilPage } from './../perfil/perfil';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from './../about/about';
import { MinhaListaPage } from './../minha-lista/minha-lista';
import { ProdutosPage } from './../produtos/produtos';
import { ListaProvider } from './../../providers/lista/lista';
import { ConfiguracaoProvider } from './../../providers/configuracao/configuracao';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  rootPage = PerfilPage;
  charts = false;
  title: string;
  showImg = false;
  showCards = false;
  listas: any[] = [];
  cards: any[] = [];

  constructor(public navCtrl: NavController, private listaProvider: ListaProvider,
    public configuracaoProvider: ConfiguracaoProvider) {
    this.verificarLista();
  }

  public chamaProdutos() {
    this.navCtrl.push(ProdutosPage);
  }

  public chamaMinhasListas() {
    this.navCtrl.push(MinhaListaPage);
  }

  public chamaSobre() {
    this.navCtrl.push(AboutPage);
  }

  public verificarLista() {

    //this.listaProvider.existsLista(parseInt(this.configuracaoProvider.getConfigFilial()))
    this.listaProvider.existsLista(1)
      .then((result: any) => {
        if (result == true) {
          //this.showChart();
          //this.title = "comece2";   
          this.showCards = true;
          this.showImg = false;
          this.buscarValores();

        } else {
          this.showCards = false;
          this.showImg = true;
          this.title = "comece2";
        }
      })
      .catch((e) => console.error("erro ao buscar listas: " + e));
  }

  public buscarValores() {

    this.listaProvider.getAll(parseInt(this.configuracaoProvider.getConfigFilial()))
      .then((result: any[]) => {

        this.listas = result;

        var valJaneiro: number;
        var valFevereiro: number;
        var valMarco: number;
        var valAbril: number;

        for (var i = 0; i < result.length; i++) {

          var data = result[i].data_criacao;
          var valor = result[i].valor_total;

          console.log("maicon - data " + data);
          console.log("maicon - valor " + valor);

          let newDate = new Date(data);

          console.log("maicon - nova data " + newDate);
          console.log("maicon - mes " + newDate.getMonth());

          var mes: string;
          /*
          if (mes == "1") {
            valJaneiro += valor;
          }
          if (mes == "2") {
            valFevereiro += valor;
          }
          if (mes == "3") {
            valMarco += valor;
          }
          if (mes == "4") {
            valAbril += valor;
          }*/

        }


      })
      .catch((e) => console.error("erro ao buscar listas: " + e));

  }



}
