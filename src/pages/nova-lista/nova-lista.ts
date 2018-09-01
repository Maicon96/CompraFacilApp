import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListaPage } from './../lista/lista';


@IonicPage()
@Component({
  selector: 'page-nova-lista',
  templateUrl: 'nova-lista.html',
})
export class NovaListaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovaListaPage');
  }

  public chamaLista() {
    this.navCtrl.push(ListaPage);
  }

}
