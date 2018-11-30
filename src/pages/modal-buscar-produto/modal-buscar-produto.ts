import { ProdutoProvider } from './../../providers/produto/produto';
import { ListaProvider } from './../../providers/lista/lista';
import { Component } from '@angular/core';
import { ConfiguracaoProvider } from './../../providers/configuracao/configuracao';
import { UtilsProvider } from './../../providers/utils/utils';
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
  valorTotal: number;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public produtoProvider: ProdutoProvider,
    public alertCtrl: AlertController, public loadingCtr: LoadingController,
    private network: Network, private configuracaoProvider: ConfiguracaoProvider,
    private utilsProvider: UtilsProvider, private listaProvider: ListaProvider) {
    this.idLista = this.navParams.get("idLista");
    this.valorTotal = this.navParams.get("valorTotal");
  }

  ionViewDidLoad() {    
  }

  fecharModalProduto() {
    this.viewCtrl.dismiss();
  }

  public listarProdutos() {    
    this.utilsProvider.verificaConexao(this.conexao);

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
        title: 'Você não possui Internet!',
        subTitle: 'Conecte-se em alguma rede e tente novamente.',
        buttons: ['OK']
      });
      alert.present();
    }
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
      message: 'Deseja adicionar o produto: ' + this.utilsProvider.formatDescricao(descricao) + '?',      
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
                let valor = this.valorTotal + preco;      
                this.listaProvider.updateValorTotal(this.idLista, valor)
                  .then((data) => {
                    console.log('sucesso ao atualizar valor da lista');
                  })
                  .catch((e) => console.error("erro ao buscar ultima lista: " + e));

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
          //"value": 1,
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
