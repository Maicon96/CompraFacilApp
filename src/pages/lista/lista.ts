import { ProdutoProvider } from './../../providers/produto/produto';
import { ConfiguracaoProvider } from './../../providers/configuracao/configuracao';
import { ModalProdutoPage } from './../modal-produto/modal-produto';
import { ModalBuscarProdutoPage } from './../modal-buscar-produto/modal-buscar-produto';
import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, ModalController, ToastController, LoadingController, AlertController,
  ItemSliding, Item
} from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

  produtos: any[] = [];
  produtoAux = new Array<any>();
  idLista: number;
  titulo: string;
  valor_total: number = 0;
  valor_gastar: number = 0.00;
  barras: any;
  showAlert: boolean;
  loading: any;
  conexao = true;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    public navParams: NavParams, private produtoProvider: ProdutoProvider,
    public configuracaoProvider: ConfiguracaoProvider, private modalCtrl: ModalController,
    private barcodeScanner: BarcodeScanner, private toast: ToastController,
    public loadingCtr: LoadingController, private network: Network) {
    this.idLista = this.navParams.get("idLista");
    this.titulo = this.navParams.get("titulo");

    if (this.navParams.get("valor_gastar") != null) {
      this.valor_gastar = this.navParams.get("valor_gastar");

      if (this.valor_gastar > 0) {
        this.showAlert = true;
      }
    }

    this.listarProdutos(this.idLista);
  }

  ionViewDidLoad() {
    this.listarProdutos(this.idLista);
  }

  ionViewDidEnter() {
    this.listarProdutos(this.idLista);
  }

  listarProdutos(idLista: number) {
    this.produtoProvider.getAll(idLista)
      .then((result: any[]) => {
        this.produtos = result;
        this.valor_total = 0;

        for (var i = 0; i < result.length; i++) {
          this.valor_total += result[i].preco * result[i].quantidade;
        }

        if (this.showAlert && this.valor_total > this.valor_gastar) {
          this.showAlertaValor();
        }

      })
      .catch((e) => console.error("erro ao buscar produtos: " + e));
  }

  excluirProduto(id: number) {
    this.produtoProvider.remove(id)
      .then(() => {
        this.listarProdutos(this.idLista);
      })
      .catch((e) => console.error("erro ao excluir produto: " + e));
  }

  editarProduto(idProduto: number, descricao: string, preco: number, quantidade: number) {
    this.modalCtrl.create(ModalProdutoPage, {
      idProduto: idProduto, idLista: this.idLista,
      descricao: descricao, preco: preco, quantidade: quantidade, update: true
    }).present();
  }

  abrirModalProduto() {
    let produtoModal = this.modalCtrl.create(ModalProdutoPage, { idLista: this.idLista });
    produtoModal.onDidDismiss(data => this.listarProdutos(this.idLista));
    produtoModal.present()
  }

  abrirModalBuscarProduto() {
    this.modalCtrl.create(ModalBuscarProdutoPage, { idLista: this.idLista }).present();
  }

  lerBarcode() {
    this.verificaConexao();

    if (this.conexao) {
      this.barcodeScanner.scan().then(barcodeData => {

        console.log('maicon - barcode = ' + barcodeData.text);

        this.barras = barcodeData.text;
        this.showLoader();
        const json = this.montarJsonEnvioBarras();

        //console.log('maicon - barcode = ' + this.barras);
        console.log("maicon - json : " + JSON.stringify(json));

        this.produtoProvider.buscarProdutos(json).subscribe(
          data => {
            const response = (data as any);
            console.log(response);

            this.produtoAux = response.registros;
            
            this.loading.dismiss();

            this.showConfirm();

            console.log(this.produtos);
          }, error => {
            this.loading.dismiss();

            const alert = this.alertCtrl.create({
              title: 'Atenção!',
              subTitle: 'Ocorreu um erro ao buscar o produto, tente novamente.',
              buttons: ['OK']
            });
            alert.present();

            console.log("maicon - erro" + error);

          })
      }).catch(e => {
        console.log('maicon - Error', e);
      });
    } else {
      const alert = this.alertCtrl.create({
        title: 'Não foi possível buscar o produto!',
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
  }

  showConfirm() {
    let descricaoProduto = this.produtoAux[0].descricaoReduzida;
    let preco = this.produtoAux[0].preco;

    console.log("maicon - " + descricaoProduto);
    console.log("maicon - " + preco);

    const confirm = this.alertCtrl.create({
      title: 'Atenção!',
      message: 'Deseja adicionar na lista o produto: ' + descricaoProduto + ' - preço: ' + preco,
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {

            this.produtoProvider.insert(this.idLista, 
              descricaoProduto, preco, 1)
              .then(() => {                      
                console.log('maicon - sucesso ao inserir item ' + descricaoProduto);                
                this.listarProdutos(this.idLista);
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
      content: 'Buscando Produto...'
    })

    this.loading.present();
  }

  showAlertaValor() {
    this.showAlert = false;

    const alert = this.alertCtrl.create({
      title: 'Atenção!!!',
      subTitle: 'O valor total de suas compras, ultrapassaram o valor que deseja gastar.',
      buttons: ['OK']
    });
    alert.present();
  }

  public openSliding(itemSlide: ItemSliding, item: Item) {
    itemSlide.setElementClass("active-sliding", true);
    itemSlide.setElementClass("active-slide", true);
    itemSlide.setElementClass("active-options-right", true);
    item.setElementStyle("transform", "translate3d(-140px, 0px, 0px)");
  }

  public montarJsonEnvioBarras() {

    return {
      limit: "1",
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
          //value: this.configuracaoProvider.getConfigFilial(),
          value: 1,
          type: "int",
          comparison: "eq",
          connector: "AND",
          field: "idFilial"
        },
        {
          value: this.barras,
          type: 'string',
          comparison: 'eq',
          connector: 'AND',
          field: 'barras'
        }

      ]
    }
  }

}
