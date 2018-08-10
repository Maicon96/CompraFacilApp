import { SelecionaFilialPage } from './../seleciona-filial/seleciona-filial';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IntroducaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-introducao',
  templateUrl: 'introducao.html',
})
export class IntroducaoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroducaoPage');
  }

  public chamaSelecionaFilial() {
    //vai para a pagina de tabs que é o meu home
    this.navCtrl.push(SelecionaFilialPage);
    //this.navCtrl.push(TabsPage);
  }

}
