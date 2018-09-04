import { ProdutoProvider } from './../../providers/produto/produto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-modal-produto',
  templateUrl: 'modal-produto.html',
})
export class ModalProdutoPage {

  idLista: number;
  cadastroItemManual: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public formBuilder: FormBuilder, public produtoProvider: ProdutoProvider) {
    this.idLista = this.navParams.get("idLista");

    this.cadastroItemManual = this.formBuilder.group({
      descricao: ['', Validators.required],
      preco: ['', Validators.required],
      quantidade: ['', Validators.required]
    });
  }

  fecharModalProduto() {
    this.viewCtrl.dismiss();
  }

  salvarItem() {
    this.produtoProvider.insert(this.idLista, this.cadastroItemManual.value.descricao, 
      this.cadastroItemManual.value.preco, this.cadastroItemManual.value.quantidade)
      .then(() => {            
        //this.navCtrl.push(ListaPage);
        console.log('sucesso ao inserir item');
        this.fecharModalProduto();
      })
      .catch((e) => console.error("erro ao inserir item: " + e));   
  }

}
