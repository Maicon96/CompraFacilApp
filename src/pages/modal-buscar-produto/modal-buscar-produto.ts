import { ProdutoProvider } from './../../providers/produto/produto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-modal-buscar-produto',
  templateUrl: 'modal-buscar-produto.html',
})
export class ModalBuscarProdutoPage {

  produtos: Array<{ descricao: string }>;
  allProdutos: any;
  queryText: string;
  produtosApi: any;
  descricao: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public produtoProvider: ProdutoProvider) {
    this.queryText = '';

    this.produtos = [
      { descricao: 'Coca cola' },
      { descricao: 'Doritos' },
      { descricao: 'Leite' },
      { descricao: 'Chocolate nestle' }
    ]

    this.allProdutos = this.produtos;
  }

  fecharModalProduto() {
    this.viewCtrl.dismiss();
  }

  filtrarProduto(prod: any) {
    let val = prod.target.value;

    if (val && val.trim() != '') {
      this.produtos = _.values(this.allProdutos);
      this.produtos = this.produtos.filter((produto) => {
        return (produto.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    } else {
      this.produtos = this.allProdutos;
    }
  }


  public buscarProdutos() {

    this.produtoProvider.buscarProdutos(this.montarFiltro()).subscribe(
      data => {
        const res = (data as any);
        this.produtosApi = res.results;
        console.log(res);
      }, error => {
        console.log(error);
      })
  }

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
          value: this.descricao,//pegar valor
          type: "string",
          comparison: "cn",
          connector: "AND",
          field: "descricao"
        }
      ]
    }
  }



}
