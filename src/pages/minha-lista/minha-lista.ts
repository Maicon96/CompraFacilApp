import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NovaListaPage } from './../nova-lista/nova-lista';

@IonicPage()
@Component({
  selector: 'page-minha-lista',
  templateUrl: 'minha-lista.html',
})
export class MinhaListaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public chamaNovaLista() {
    this.navCtrl.push(NovaListaPage);
  }

}
