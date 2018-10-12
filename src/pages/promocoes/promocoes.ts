import { ProdutoProvider } from './../../providers/produto/produto';
import { ConfiguracaoProvider } from './../../providers/configuracao/configuracao';
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
    public configuracaoProvider: ConfiguracaoProvider,
    public toastCtrl: ToastController, private network: Network, private platform: Platform,
    public alertCtrl: AlertController) {
  }


  ionViewDidLoad() {
    this.verificaConexao();

    if (this.conexao) {
      this.buscarProdutosPopulares();
    } else {
      const alert = this.alertCtrl.create({
        title: 'Não foi possível buscar as promoções!',
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
    /*
    this.network.onConnect().subscribe(() => {
      console.log('maicon - network connected!');

      this.conexao = true;

      setTimeout(() => {
        if (this.network.type == 'wifi') {
          console.log('maicon - we got a wifi connection, woohoo!');
          this.conexao = true;
        }
      }, 3000);

    });*/
  }

  public buscarProdutosPopulares() {
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

        console.log("maicon - erro" + error);
      })
  }

  showLoader() {
    this.loading = this.loadingCtr.create({
      content: 'Buscando Promoções...'
    })

    this.loading.present();
  }

  public montarJsonEnvio() {
        return {
      "limit": 20,
      "idEmpresa": 1,           
      "idFilial": parseInt(this.configuracaoProvider.getConfigFilial()),      
      "promocao": "2"
    }
  }

}
