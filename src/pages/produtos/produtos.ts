import { SelecionaFilialProvider } from './../../providers/seleciona-filial/seleciona-filial';
import { ProdutoProvider } from './../../providers/produto/produto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {
  
  produtoDigitado: string;
  idEmpresa: number;
  idFilial: number;
  barras: string;
  codigo: number;
  digito: string;
  descricao: string;
  descricaoReduzida: string;
  preco: Number;
  imagem: any;

  produtos = new Array<any>();


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public produtoProvider: ProdutoProvider, public filialProvider: SelecionaFilialProvider) {
  }
  
  public buscarProdutos() {
    //debugger;

    if (this.produtoDigitado != '' && this.produtoDigitado != null) {
      this.produtoProvider.buscarProdutos(this.montarJsonEnvio()).subscribe(
        data => {
          const res = (data as any);
          //this.produtosApi = res.results;
          console.log(res);
        }, error => {
          console.log(error);
        })
    }    
  }
  
  public montarJsonEnvio() {
    
    return {
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
          value: this.filialProvider.getLasted(),
          type: "int",
          comparison: "eq",
          connector: "AND",
          field: "idFilial"
        },
        {
          value: this.produtoDigitado,
          type: "string",
          comparison: "cn",
          connector: "AND",
          field: "descricao"
        }
      ]
    }
  }

}
