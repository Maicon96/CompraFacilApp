import { ProdutoProvider } from './../../providers/produto/produto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-promocoes',
  templateUrl: 'promocoes.html',
})
export class PromocoesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public produtoProvider: ProdutoProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromocoesPage');
  }

/*
  public buscarProdutosPopulares() {

    this.produtoProvider.buscarProdutosPopulares(this.montarFiltro()).subscribe(
      data => {
        const res = (data as any);
        //this.produtosApi = res.results;
        console.log(res);
      }, error => {
        console.log(error);
      })
  }*/

  public montarFiltro() {
    let produto;

    return produto = {
      limit: "5",
      start: 0,
      page: "1",
      sort: [
        {
          property: "descricao",
          direction: "ASC"
        }
      ],
      filterRow: [
        {
          value: "1",
          type: "int",
          comparison: "eq",
          connector: "AND",
          field: "idEmpresa"
        },
        {
          value: "",//pegar valor
          type: "int",
          comparison: "eq",
          connector: "AND",
          field: "idFilial"
        },
        {
          //value: this.descricao,//pegar valor
          type: "string",
          comparison: "cn",
          connector: "AND",
          field: "descricao"
        }
      ]
    }
  }

}
