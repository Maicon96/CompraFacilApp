import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SelecionaFilialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-seleciona-filial',
  templateUrl: 'seleciona-filial.html',
})
export class SelecionaFilialPage {

private testRadioOpen;
private testRadioResult;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) { }

  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Filial do Supermercado');

    this.addInputRadio(alert, 'Palmitos - SC', 'palmitos', true);
    this.addInputRadio(alert, 'Caibi - SC', 'caibi', false);
    this.addInputRadio(alert, 'Mondai - SC', 'mondai', false);
    this.addInputRadio(alert, 'Riqueza - SC', 'riqueza', false);
    this.addInputRadio(alert, 'Alpestre - RS', 'alpestre', false);
    this.addInputRadio(alert, 'Belmonte - SC', 'belmonte', false);
    this.addInputRadio(alert, 'Descanso - SC', 'descanso', false);
    this.addInputRadio(alert, 'Erval Seco - RS', 'erval', false);
    this.addInputRadio(alert, 'Iporâ do Oeste - SC', 'ipora', false);
    this.addInputRadio(alert, 'Itapiranga - SC', 'irapiranga', false);
    this.addInputRadio(alert, 'Novo Tiradentes - RS', 'tiradentes', false);
    this.addInputRadio(alert, 'Planalto - RS', 'planalto', false);
    this.addInputRadio(alert, 'Vista Gaúcha - RS', 'vistaGaucha', false);
    this.addInputRadio(alert, 'Rodeio Bonito - RS', 'rodeioBonito', false);
    this.addInputRadio(alert, 'Pinhal - RS', 'pinhal', false);
    this.addInputRadio(alert, 'Santa Helena - SC', 'santaHelena', false);
    this.addInputRadio(alert, 'São João do Oeste - SC', 'saoJoao', false);
    this.addInputRadio(alert, 'Tunápolis - SC', 'tunapolis', false); 

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.navCtrl.push(TabsPage);

        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });
    alert.present();
  }

  addInputRadio(alert, label: string, value: string, checked: boolean) { 
    alert.addInput({
      type: 'radio',
      label: label,
      value: value,
      checked: checked
    });
  }

}
