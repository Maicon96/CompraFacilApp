import { PerfilPage } from './../perfil/perfil';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from './../about/about';
import { MinhaListaPage } from './../minha-lista/minha-lista';
import { ProdutosPage } from './../produtos/produtos';
import { ListaProvider } from './../../providers/lista/lista';
import { ConfiguracaoProvider } from './../../providers/configuracao/configuracao';
import * as $ from 'jquery';

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
    'style="backgorund-color: #a1d3e7;"',
    'style="backgorund-color: #a1d3e7;"',
    'style="backgorund-color: #a1d3e7;"',
    'style="backgorund-color: #a1d3e7;"',
    'style="backgorund-color: #a1d3e7;"',
    'style="backgorund-color: #a1d3e7;"',
    'style="backgorund-color: #a1d3e7;"',
  ];

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

    this.listaProvider.existsLista(parseInt(this.configuracaoProvider.getConfigFilial()))    
      .then((result: any) => {
        if (result == true) {
          this.showCards = true;
          this.showImg = false;
          this.buscarValores();
        } else {
          this.showCards = true;
          this.showImg = false;
          this.buscarValores();
          //this.showCards = false;
          //this.showImg = true;          
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

        for (var i = 0; i < result.length; i++) {

          var dataCriacao = result[i].data_criacao;
          var valor = result[i].valor_total;
          
          var mes = dataCriacao.substring(3,5);          
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
        }

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
      card3.mes = "Setembro";
      card3.valor = 1420.51;
      card3.id = 3;
      this.cards.push(card3);

      let card4 = new Card();
      card4.mes = "Outubro";
      card4.valor = 2140.56;
      card4.id = 4;
    this.cards.push(card4);
  }

  public deletarRegistros(){
    if(!this.showCheckbox){
      this.showCheckbox = true;
      return true;
    }
    let id;
    let checkbox = $('ion-checkbox div.checkbox-checked');
    if(checkbox.length > 0){
      if(confirm('Realmente deseja deletar os caraio?')){
        $.each(checkbox, function (key, value) {
          id = $(value).parent().attr('id');
          console.log(id);
          //faz aqui a deleção com o id de cima
        });
        alert('deleta');
      }else{
        $.each(checkbox, function (key, value) {
          $(value).click();
        });
        alert('não deleta');
      }
    }
    // this.showCheckbox = false;
    //descomenta essa linha e usa quando quiser esconder as checkbox
  }

}

export class Card {
  mes: string;
  valor: number;
  id: number;
}
