import { ProdutoProvider } from './../../providers/produto/produto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController, Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';


@IonicPage()
@Component({
  selector: 'page-promocoes',
  templateUrl: 'promocoes.html',
})
export class PromocoesPage {

  produtos = new Array<any>();
  loading: any;
  conexao = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtr: LoadingController, public produtoProvider: ProdutoProvider,
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
        subTitle: 'Você não possui conexão Wi-Fi',
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

    console.log("maicon - json : " + JSON.stringify(json));

    this.showLoader();

    this.produtoProvider.buscarProdutosPopulares(json).subscribe(
      data => {
        const res = (data as any);
        this.produtos = res.registros;
        this.loading.dismiss();
        console.log(this.produtos);
      }, error => {
        this.loading.dismiss();

        const toast = this.toastCtrl.create({
          message: 'Opsss, ocorreu um erro ao buscar os produtos...',
          position: 'middle',
          showCloseButton: true,
          closeButtonText: 'OK'
        });
        toast.present();

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
      "idFilial": 1,
      "promocao": "2"
    }
  }

}
