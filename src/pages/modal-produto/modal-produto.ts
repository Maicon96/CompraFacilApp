import { ListaPage } from './../lista/lista';
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

  cadastroItemManual: any = {};
  idLista: number;
  idProduto: number;
  descricao: number;
  preco: number;
  quantidade: number;  
  update: boolean = false;
  descricaoBotao: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public formBuilder: FormBuilder, public produtoProvider: ProdutoProvider) {
    this.idLista = this.navParams.get("idLista");
    this.idProduto = this.navParams.get("idProduto");
    this.descricao = this.navParams.get("descricao");
    this.preco = this.navParams.get("preco");
    this.quantidade = this.navParams.get("quantidade");
    this.update = this.navParams.get("update");

    console.log("maicon - lista " + this.idLista);
    
    if (this.update) {
      this.descricaoBotao = "Atualizar";      
    } else {
      this.descricaoBotao = "Adicionar";
    }

    this.cadastroItemManual.descricao = this.descricao;

    this.cadastroItemManual = this.formBuilder.group({
      descricao: ['', Validators.required],
      preco: ['', Validators.required],
      quantidade: ['', Validators.required]
    });
  }

  fecharModalProduto() {
    this.viewCtrl.dismiss();
  }

  incluirItem() {
    if (this.update) {
      this.produtoProvider.update(this.idProduto, this.idLista, this.cadastroItemManual.value.descricao, 
        this.cadastroItemManual.value.preco, this.cadastroItemManual.value.quantidade)
        .then(() => {                      
          console.log('sucesso ao atualizar item');
          this.fecharModalProduto();
        })
        .catch((e) => console.error("erro ao atualizar item: " + e));   
    } else {
      this.produtoProvider.insert(this.idLista, this.cadastroItemManual.value.descricao, 
        this.cadastroItemManual.value.preco, this.cadastroItemManual.value.quantidade)
        .then(() => {                      
          console.log('sucesso ao inserir item');
          this.fecharModalProduto();
        })
        .catch((e) => console.error("erro ao inserir item: " + e));   
    }
    
  }

}
