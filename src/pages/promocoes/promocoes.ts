import { ProdutoProvider } from './../../providers/produto/produto';
import { ConfiguracaoProvider } from './../../providers/configuracao/configuracao';
import { UtilsProvider } from './../../providers/utils/utils';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController, Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';


@IonicPage()
@Component({
  selector: 'page-promocoes',
  templateUrl: 'promocoes.html',
})
export class PromocoesPage {

  public produtos = new Array<any>();
  desc: any;
  preco: any;
  loading: any;
  conexao = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtr: LoadingController, public produtoProvider: ProdutoProvider,
    public configuracaoProvider: ConfiguracaoProvider, public utilsProvider: UtilsProvider,
    public toastCtrl: ToastController, private network: Network, private platform: Platform,
    public alertCtrl: AlertController) {
  }


  ionViewDidLoad() {
    this.buscarProdutosPopulares();
  }

  public buscarProdutosPopulares() {

    this.utilsProvider.verificaConexao(this.conexao);

    if (this.conexao) {
      const json = this.montarJsonEnvio();

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
            subTitle: 'Ocorreu um erro ao buscar as promoções, tente novamente.',
            buttons: ['OK']
          });
          alert.present();
        })

    } else {
      const alert = this.alertCtrl.create({
        title: 'Você não possui Internet!',
        subTitle: 'Conecte-se em alguma rede e tente novamente.',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  showLoader() {
    this.loading = this.loadingCtr.create({
      content: 'Buscando Promoções...'
    })

    this.loading.present();
  }

  public formatDescricaoProdutos(str: string) {    
    return this.utilsProvider.formatDescricao(str);    
  }

  public montarJsonEnvio() {
    return {
      "limit": 20,
      "idEmpresa": 1,
      "idFilial": parseInt(this.configuracaoProvider.getConfigFilial()),
      "promocao": "2"
    }
  }

  doRefresh(refresher) {    
    this.buscarProdutosPopulares();    
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

}
