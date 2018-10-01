import { SelecionaFilialProvider } from './../../providers/seleciona-filial/seleciona-filial';
import { ConfiguracaoProvider } from './../../providers/configuracao/configuracao';
import { ListaProvider } from './../../providers/lista/lista';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListaPage } from './../lista/lista';
import { Validators, FormBuilder } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-nova-lista',
  templateUrl: 'nova-lista.html',
})
export class NovaListaPage {

  cadastroLista: any = {};
  idLista: number;
  idFilial: number;
  nome: string;
  valor_total: number;
  valor_gastar: number;
  data_criacao: string;
  update: boolean = false;
  descricaoBotao: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
    public listaProvider: ListaProvider, public filialProvider: SelecionaFilialProvider,
    public configuracaoProvider: ConfiguracaoProvider) {
    this.idLista = this.navParams.get("idLista");
    this.idFilial = this.navParams.get("idFilial");
    this.nome = this.navParams.get("nome");
    this.valor_total = this.navParams.get("valor_total");
    this.valor_gastar = this.navParams.get("valor_gastar");
    this.data_criacao = this.navParams.get("data_criacao");
    this.update = this.navParams.get("update");

    if (this.update) {
      this.descricaoBotao = "Atualizar";
    } else {
      this.descricaoBotao = "Criar";
    }

    this.cadastroLista.nome = this.nome;
    this.cadastroLista.valor_gastar = this.valor_gastar;

    this.cadastroLista = this.formBuilder.group({
      nome: ['', Validators.required],
      valor_gastar: ['', Validators.required]
    });
  }

  salvarLista() {
    if (this.update) {
      console.log("maicon - lista: " + this.idLista);
      console.log("maicon - filial: " + this.idFilial);
      console.log("maicon - nome: " + this.cadastroLista.value.nome);
      console.log("maicon - valor_total: " + this.valor_total);
      console.log("maicon - valor_gastar: " + this.cadastroLista.value.valor_gastar);
      console.log("maicon - data_criacao: " + this.data_criacao);

      this.listaProvider.update(this.idLista, this.idFilial, this.cadastroLista.value.nome,
        this.valor_total, this.cadastroLista.value.valor_gastar, this.data_criacao)
        .then((data) => {
          this.listaProvider.getLasted()
            .then((idLista) => {
              this.navCtrl.push(ListaPage, {
                idLista: idLista,
                titulo: this.cadastroLista.value.nome,
                valor_gastar: this.cadastroLista.value.valor_gastar
              });
              console.log('sucesso ao inserir');
            })
            .catch((e) => console.error("erro ao buscar ultima lista: " + e));
        })
        .catch((e) => console.error("erro ao inserir: " + e));

    } else {
      var dataAtual = new Date();
      var idFilial = this.configuracaoProvider.getConfigFilial();

      this.listaProvider.insert(idFilial, this.cadastroLista.value.nome, 0,
        this.cadastroLista.value.valor_gastar, dataAtual.toLocaleDateString())
        .then((data) => {
          this.listaProvider.getLasted()
            .then((idLista) => {
              this.navCtrl.push(ListaPage, {
                idLista: idLista,
                titulo: this.cadastroLista.value.nome,
                valor_gastar: this.cadastroLista.value.valor_gastar
              });
              console.log('sucesso ao inserir');
            })
            .catch((e) => console.error("erro ao buscar ultima lista: " + e));
        })
        .catch((e) => console.error("erro ao inserir: " + e));


      /*
      this.filialProvider.getLasted()
      .then((idFilial) => {
        this.listaProvider.insert(idFilial, this.cadastroLista.value.nome, 0,
          this.cadastroLista.value.valor_gastar, dataAtual.toLocaleDateString())
          .then((data) => {
            this.listaProvider.getLasted()
              .then((idLista) => {                
                this.navCtrl.push(ListaPage, { idLista: idLista,
                  titulo: this.cadastroLista.value.nome,
                  valor_gastar: this.cadastroLista.value.valor_gastar
                });
                console.log('sucesso ao inserir');
              })
              .catch((e) => console.error("erro ao buscar ultima lista: " + e));
          })
          .catch((e) => console.error("erro ao inserir: " + e));
      })
      .catch((e) => console.error("erro ao buscar ultima filial: " + e));  

      */
    }

  }

}
