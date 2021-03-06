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
  templateUrl: 'nova-lista.html'  
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

    console.log("maicon - valor_gastar: " + this.valor_gastar);

    this.cadastroLista.nome = this.nome;
    this.cadastroLista.valor_gastar = this.valor_gastar;

    this.cadastroLista = this.formBuilder.group({
      nome: ['', Validators.required],
      valor_gastar: ['', Validators.required]
    });
  }

  salvarLista() {
    var idFilial = parseInt(this.configuracaoProvider.getConfigFilial());

    let valor_gastar = this.cadastroLista.value.valor_gastar.toString().replace('.','');
    valor_gastar = valor_gastar.replace(',','.');

    console.log("maicon - valor_gastar " + valor_gastar);

    if (this.update) {

      this.listaProvider.update(this.idLista, idFilial, this.cadastroLista.value.nome,
        this.valor_total, valor_gastar, this.data_criacao)
        .then((data) => {
          this.listaProvider.getLasted()
            .then((idLista) => {
              this.navCtrl.push(ListaPage, {
                idLista: idLista,
                titulo: this.cadastroLista.value.nome,
                valor_gastar: valor_gastar
              });
              console.log('maicon - sucesso ao inserir');
            })
            .catch((e) => console.error("maicon - erro ao buscar ultima lista: " + e));
        })
        .catch((e) => console.error("maicon - erro ao inserir: " + e));

    } else {
      var data = new Date();
      var dia;
      
      if (data.getDate() < 10) {
        dia = "0" + data.getDate(); 
      } else {
        dia = data.getDate()
      }
      var dataAtual = (dia + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear());

      this.listaProvider.insert(idFilial, this.cadastroLista.value.nome, 0,
        valor_gastar, dataAtual.toString())
        .then((data) => {
          this.listaProvider.getLasted()
            .then((idLista) => {
              this.navCtrl.push(ListaPage, {
                idLista: idLista,
                titulo: this.cadastroLista.value.nome,
                valor_gastar: valor_gastar
              });
              console.log('maicon - sucesso ao inserir');
            })
            .catch((e) => console.error("maicon - erro ao buscar ultima lista: " + e));
        })
        .catch((e) => console.error("maicon - erro ao inserir: " + e));
    }
  }
}
