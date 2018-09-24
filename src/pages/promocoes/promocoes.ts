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
    this.buscarProdutosPopulares();

  }

  public buscarProdutosPopulares() {
    const json = this.montarJsonEnvio();    
    
    console.log("maicon - json : " + JSON.stringify(json));

    this.produtoProvider.buscarProdutosPopulares(json).subscribe(
      data => {        
        const res = (data as any);
        //this.produtosApi = res.results;
        console.log("maicon - sucesso" + res);
      }, error => {
        console.log("maicon - erro" + error);        
      })
  }

  public montarJsonEnvio() {
    return {
      "limit": 20,
      "idEmpresa": 1,
      "idFilial": 1,
      "promocao": "2"
    }
  }

}
