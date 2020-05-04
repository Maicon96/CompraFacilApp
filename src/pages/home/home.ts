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
  showImg = false;
  showCards = false;
  listas: any[] = [];
  cards = new Array<Card>();
  showCheckbox = false;
  coresDegrade = [
    '#f6fcfe',    
    '#e7f8fc',
    '#d7f4fa',
    '#c8eff9',
    '#b9ebf7',
    '#aae7f5',
    '#9be2f3',
    '#8bdef1',
    '#7cdaf0',
    '#6dd6ee',
    '#5ed1ec',
    '#4fcdea',
    '#3fc9e8',
    '#30c4e7',
    '#21c0e5',
    '#1ab7db'
  ];

  constructor(public navCtrl: NavController, private listaProvider: ListaProvider,
    public configuracaoProvider: ConfiguracaoProvider) {
  }

  ionViewDidEnter() {
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
    this.listaProvider.existsLista(parseInt(this.configuracaoProvider.getConfigFilial()))
      .then((result: any) => {
        if (result == true) {
          this.showCards = true;
          this.showImg = false;
          //this.buscarValores();
        } else {
          this.showCards = true;
          this.showImg = false;
          //this.buscarValores();
          /*this.showCards = false;
          this.showImg = true;      */    
        }
      })
      .catch((e) => console.error("erro ao buscar listas: " + e));
  }

  doRefresh(refresher) {
    this.showImg = false;
    this.showCards = false;
    this.cards = new Array<Card>();
    this.verificarLista();

    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  public buscarValores() {
    this.cards = new Array<Card>();

    this.listaProvider.getAll(parseInt(this.configuracaoProvider.getConfigFilial()))
      .then((result: any[]) => {

        this.listas = result;

        let valJaneiro = 0;
        let valFevereiro = 0;
        let valMarco = 0;
        let valAbril = 0;
        let valMaio = 0;
        let valJunho = 0;
        let valJulho = 0;
        let valAgosto = 0;
        let valSetembro = 0;
        let valOutubro = 0;
        let valNovembro = 0;
        let valDezembro = 0;

        /*for (var i = 0; i < result.length; i++) {

          var dataCriacao = result[i].data_criacao;
          var valor = result[i].valor_total;

          var mes = dataCriacao.substring(3, 5);
          var ano = dataCriacao.substring(6);

          var data = new Date();
          var anoAtual = data.getFullYear();

          if (ano == anoAtual) {
            if (valor > 0) {
              if (mes == 1) {
                valJaneiro += valor;
              }
              if (mes == 2) {
                valFevereiro += valor;
              }
              if (mes == 3) {
                valMarco += valor;
              }
              if (mes == 4) {
                valAbril += valor;
              }
              if (mes == 5) {
                valMaio += valor;
              }
              if (mes == 6) {
                valJunho += valor;
              }
              if (mes == 7) {
                valJulho += valor;
              }
              if (mes == 8) {
                valAgosto += valor;
              }
              if (mes == 9) {
                valSetembro += valor;
              }
              if (mes == 10) {
                valOutubro += valor;
              }
              if (mes == 11) {
                valNovembro += valor;
              }
              if (mes == 12) {
                valDezembro += valor;
              }
            }
          }
        }*/

        if (valJaneiro > 0) {
          let card = new Card();
          card.mes = "Janeiro";
          card.valor = valJaneiro;
          this.cards.push(card);
        }
        if (valFevereiro > 0) {
          let card = new Card();
          card.mes = "Fevereiro";
          card.valor = valFevereiro;
          this.cards.push(card);
        }
        if (valMarco > 0) {
          let card = new Card();
          card.mes = "Março";
          card.valor = valMarco;
          this.cards.push(card);
        }
        if (valAbril > 0) {
          let card = new Card();
          card.mes = "Abril";
          card.valor = valAbril;
          this.cards.push(card);
        }
        if (valMaio > 0) {
          let card = new Card();
          card.mes = "Maio";
          card.valor = valMaio;
          this.cards.push(card);
        }
        if (valJunho > 0) {
          let card = new Card();
          card.mes = "Junho";
          card.valor = valJunho;
          this.cards.push(card);
        }
        if (valJulho > 0) {
          let card = new Card();
          card.mes = "Julho";
          card.valor = valJulho;
          this.cards.push(card);
        }
        if (valAgosto > 0) {
          let card = new Card();
          card.mes = "Agosto";
          card.valor = valAgosto;
          this.cards.push(card);
        }
        if (valSetembro > 0) {
          let card = new Card();
          card.mes = "Setembro";
          card.valor = valSetembro;
          this.cards.push(card);
        }
        if (valOutubro > 0) {
          let card = new Card();
          card.mes = "Outubro";
          card.valor = valOutubro;
          this.cards.push(card);
        }
        if (valNovembro > 0) {
          let card = new Card();
          card.mes = "Novembro";
          card.valor = valNovembro;
          this.cards.push(card);
        }
        if (valDezembro > 0) {
          let card = new Card();
          card.mes = "Dezembro";
          card.valor = valDezembro;
          this.cards.push(card);
        }

      })
      .catch((e) => console.error("erro ao buscar listas: " + e));



    let card = new Card();
    card.mes = "Janeiro";
    card.valor = 620.85;
    card.id = 1;
    this.cards.push(card);

    let card2 = new Card();
    card2.mes = "Fevereiro";
    card2.valor = 350.20;
    card2.id = 2;
    this.cards.push(card2);

    let card3 = new Card();
    card3.mes = "Março";
    card3.valor = 1420.51;
    card3.id = 3;
    this.cards.push(card3);

    let card4 = new Card();
    card4.mes = "Abril";
    card4.valor = 2140.56;
    card4.id = 4;
    this.cards.push(card4);

    let card5 = new Card();
    card5.mes = "Maio";
    card5.valor = 120.00;
    card5.id = 4;
    this.cards.push(card5);

    let card6 = new Card();
    card6.mes = "Junho";
    card6.valor = 3210.00;
    card6.id = 4;
    this.cards.push(card6);

    let card7 = new Card();
    card7.mes = "Julho";
    card7.valor = 789.74;
    card7.id = 4;
    this.cards.push(card7);

    let card8 = new Card();
    card8.mes = "Agosto";
    card8.valor = 2056.68;
    card8.id = 4;
    this.cards.push(card8);

    let card9 = new Card();
    card9.mes = "Setembro";
    card9.valor = 1320.00;
    card9.id = 4;
    this.cards.push(card9);

    let card10 = new Card();
    card10.mes = "Outubro";
    card10.valor = 4100.23;
    card10.id = 4;
    this.cards.push(card10);

    let card11 = new Card();
    card11.mes = "Novembro";
    card11.valor = 2745.00;
    card11.id = 4;
    this.cards.push(card11);

    let card12 = new Card();
    card12.mes = "Dezembro";
    card12.valor = 3600.47;
    card12.id = 4;
    this.cards.push(card12);
    

    }
}

export class Card {
  mes: string;
  valor: number;
  id: number;
}
