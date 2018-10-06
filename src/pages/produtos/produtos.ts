import { SelecionaFilialProvider } from './../../providers/seleciona-filial/seleciona-filial';
import { ProdutoProvider } from './../../providers/produto/produto';
import { ConfiguracaoProvider } from './../../providers/configuracao/configuracao';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

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
  loading: any;
  conexao = true;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public produtoProvider: ProdutoProvider, public filialProvider: SelecionaFilialProvider,
    public configuracaoProvider: ConfiguracaoProvider, public loadingCtr: LoadingController, 
    public toastCtrl: ToastController, private network: Network, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {    
    this.verificaConexao();

    if (this.conexao) {
      this.listarProdutos();
    } else {      
      const alert = this.alertCtrl.create({
        title: 'Erro ao buscar Promoções!',
        subTitle: 'Você não possui Internet',
        buttons: ['OK']
      });
      alert.present();
    }    
  }

  verificaConexao() {
    if (this.network.type === 'none') {
      this.conexao = false;
    }
  }

  public listarProdutos() {
    const json = this.montarJsonListar();

    console.log("maicon - json : " + JSON.stringify(json));

    this.showLoader();

    this.produtoProvider.buscarProdutosPopulares(json).subscribe(
      data => {
        const res = (data as any);
        console.log(res);
        this.produtos = res.registros;
        console.log(this.produtos);

        this.loading.dismiss();
        
      }, error => {
        this.loading.dismiss();
        
        const alert = this.alertCtrl.create({
          title: 'Atenção!',
          subTitle: 'Ocorreu um erro ao buscar os produtos, tente novamente.',
          buttons: ['OK']
        });
        alert.present();

        console.log("maicon - erro" + error);
      })
  }

  public buscarProdutos() {
    //debugger;

    this.showLoader();
    const json = this.montarJsonEnvio();
    console.log("maicon - json : " + JSON.stringify(json));    

    if (this.produtoDigitado != '' && this.produtoDigitado != null) {
      this.produtoProvider.buscarProdutos(json).subscribe(
        data => {
          const response = (data as any);
          this.produtos = response.registros;
          this.loading.dismiss();
          console.log(this.produtos);
        }, error => {
          this.loading.dismiss();

          const alert = this.alertCtrl.create({
            title: 'Atenção!',
            subTitle: 'Ocorreu um erro ao buscar os produtos, tente novamente!',
            buttons: ['OK']
          });
          alert.present();         

          console.log("maicon - erro" + error);

        })
    }
  }

  showLoader() {
    this.loading = this.loadingCtr.create({
      content: 'Buscando Produtos...'
    })

    this.loading.present();
  }

  public montarJsonEnvio() {

    return {
      "limit": "5",
      "start": 0,
      "page": "1",
      "sort": [
        {
          "property": "descricao",
          "direction": "ASC"
        }
      ],
      "filterRow": [
        {
          "value": "1",
          "type": "int",
          "comparison": "eq",
          "connector": "AND",
          "field": "idEmpresa"
        },
        {
          "value": this.configuracaoProvider.getConfigFilial(),
          "type": "int",
          "comparison": "eq",
          "connector": "AND",
          "field": "idFilial"
        },
        {
          "value": this.produtoDigitado,
          "type": "string",
          "comparison": "cn",
          "connector": "AND",
          "field": "descricao"
        }
      ]
    }
  }

  public montarJsonListar() {
    
    var num = parseInt(this.configuracaoProvider.getConfigFilial()); 

    console.log("filial " + num);
    
    return {
      "limit": 20,
      "idEmpresa": 1,
      "idFilial": 1,
      "promocao": "1"
    }
  }

  

}



