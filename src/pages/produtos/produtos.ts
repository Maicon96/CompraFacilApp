import { SelecionaFilialProvider } from './../../providers/seleciona-filial/seleciona-filial';
import { ProdutoProvider } from './../../providers/produto/produto';
import { ConfiguracaoProvider } from './../../providers/configuracao/configuracao';
import { UtilsProvider } from './../../providers/utils/utils';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Searchbar } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})

export class ProdutosPage {   
  
  @ViewChild('searchbar') searchbar: Searchbar;


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
    public configuracaoProvider: ConfiguracaoProvider, public utilsProvider: UtilsProvider,
    public loadingCtr: LoadingController, public toastCtrl: ToastController, private network: Network,
    public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    this.listarProdutos();
  }

  public listarProdutos() {

      this.utilsProvider.verificaConexao(this.conexao);

      if (this.conexao) {
        this.showLoader();

        const json = this.montarJsonListar();
        this.produtoProvider.buscarProdutosPopulares(json).subscribe(
          data => {
            const res = (data as any);          
            this.produtos = res.registros;          
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
      } else {
        const alert = this.alertCtrl.create({
          title: 'Você não possui Internet!',
          subTitle: 'Conecte-se em alguma rede e tente novamente.',
          buttons: ['OK']
        });
        alert.present();
      }
    //}, 3000);
  }

  public buscarProdutos() {

    this.utilsProvider.verificaConexao(this.conexao);

    if (this.conexao) {
      if (this.produtoDigitado != '' && this.produtoDigitado != null) {
        this.showLoader();
        const json = this.montarJsonEnvio();

        this.produtoProvider.buscarProdutos(json).subscribe(
          data => {
            const response = (data as any);
            this.produtos = response.registros;
            this.loading.dismiss();            
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
      } else {
        this.listarProdutos();
      }
    } else {
      const alert = this.alertCtrl.create({
        title: 'Erro ao buscar Produtos!',
        subTitle: 'Você não possui Internet',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  doRefresh(refresher) {     
    if (this.produtoDigitado != '' && this.produtoDigitado != null) {
      this.buscarProdutos();
    } else {
      this.listarProdutos();
    }

    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  limparProdutoDigitado() {
    this.produtoDigitado = '';
  }

  showLoader() {
    this.loading = this.loadingCtr.create({
      spinner: 'bubbles',
      content: 'Buscando Produtos...'
    })

    this.loading.present();
  }

  public formatDescricaoProdutos(str: string) {        
    return this.utilsProvider.formatDescricao(str);    
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
          "value": parseInt(this.configuracaoProvider.getConfigFilial()),
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
    return {
      "limit": 20,
      "idEmpresa": 1,
      "idFilial": parseInt(this.configuracaoProvider.getConfigFilial()),
      "promocao": "1"
    }
  }





}



