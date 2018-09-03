import { SelecionaFilialProvider } from './../../providers/seleciona-filial/seleciona-filial';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
    public listaProvider: ListaProvider, public filialProvider: SelecionaFilialProvider) {

    this.cadastroLista = this.formBuilder.group({
      nome: ['', Validators.required]
    });
  }

  public salvarLista() {

    var dataAtual = new Date();

    this.filialProvider.getLasted()
      .then((data) => {
        this.listaProvider.insert(data, this.cadastroLista.value.nome, 0, 0, dataAtual.toLocaleDateString())
          .then(() => {            
            this.navCtrl.push(ListaPage);
            console.log('sucesso ao inserir');
          })
          .catch((e) => console.error("erro ao inserir: " + e));
      })
      .catch((e) => console.error("erro ao buscar ultima filial: " + e));

  }

}
