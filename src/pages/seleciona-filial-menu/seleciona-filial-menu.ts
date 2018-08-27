import { SelecionaFilialProvider } from './../../providers/seleciona-filial/seleciona-filial';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { TabsPage } from './../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-seleciona-filial-menu',
  templateUrl: 'seleciona-filial-menu.html',
})
export class SelecionaFilialMenuPage {

  private testRadioOpen;
  private testRadioResult;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private dbProvider: DatabaseProvider, public filialProvider: SelecionaFilialProvider) { }

  ionViewWillEnter() {

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
        console.log("chegou aqui");
        
        this.filialProvider.insert(1, 'Palmitos')        
        .then(() => console.log('sucesso ao inserir'))
        .catch((e) => console.error("erro ao inserir: " + e));
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

