import { ProdutoProvider } from './../../providers/produto/produto';
import { Component } from '@angular/core';
import { ConfiguracaoProvider } from './../../providers/configuracao/configuracao';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';


@IonicPage()
@Component({
  selector: 'page-modal-buscar-produto',
  templateUrl: 'modal-buscar-produto.html',
})
export class ModalBuscarProdutoPage {

  produtos = new Array<any>();
  produtoDigitado: string;
  loading: any;
  conexao = true;
  idLista: number;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public produtoProvider: ProdutoProvider,
    public alertCtrl: AlertController, public loadingCtr: LoadingController,
    private network: Network, public configuracaoProvider: ConfiguracaoProvider) {
    this.idLista = this.navParams.get("idLista");
  }

  ionViewDidLoad() {
    //this.verificaConexao();

    /*if (this.conexao) {
      this.listarProdutos();
    } else {
      const alert = this.alertCtrl.create({
        title: 'Erro ao buscar Produtos!',
        subTitle: 'Você não possui Internet',
        buttons: ['OK']
      });
      alert.present();
    }*/
  }

  fecharModalProduto() {
    this.viewCtrl.dismiss();
  }

  public listarProdutos() {
    this.verificaConexao();

    if (this.conexao) {
      const json = this.montarJsonListar();
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
    } else {
      const alert = this.alertCtrl.create({
        title: 'Erro ao buscar Produtos!',
        subTitle: 'Você não possui Internet',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  public buscarProdutos() {
    this.verificaConexao();    
    
    if (this.conexao) {
      if (this.produtoDigitado != '' && this.produtoDigitado != null) {
        this.showLoader();
        const json = this.montarJsonEnvio();

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

  incluirItem(descricao: string, preco: number) {

    const confirm = this.alertCtrl.create({
      title: 'Atenção!',
      message: 'Deseja adicionar o produto: ' + descricao + '?',      
      buttons: [
        {
          text: 'Não',
          handler: () => {
          }
        },
        {
          text: 'Sim',
          handler: () => {

            this.produtoProvider.insert(this.idLista, descricao, preco, 1)
              .then(() => {
                console.log('maicon - sucesso ao inserir item');
                //this.fecharModalProduto();
              })
              .catch((e) => console.error("maicon - erro ao inserir item: " + e));
          }          
        }
      ]
    });
    confirm.present();
  }


  verificaConexao() {
    if (this.network.type === 'none') {
      this.conexao = false;
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
          //"value": this.configuracaoProvider.getConfigFilial(),
          "value": 1,
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
