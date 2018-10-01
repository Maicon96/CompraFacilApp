import { SelecionaFilialProvider } from './../../providers/seleciona-filial/seleciona-filial';
import { ConfiguracaoProvider } from './../../providers/configuracao/configuracao';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-seleciona-filial',
  templateUrl: 'seleciona-filial.html',
})
export class SelecionaFilialPage {

private testRadioOpen;
private testRadioResult;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public filialProvider: SelecionaFilialProvider, public configuracaoProvider: ConfiguracaoProvider) { }

  abrirRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Filial do Supermercado');

    this.addInputRadio(alert, 'Palmitos - SC', '1', true);    
    this.addInputRadio(alert, 'Alpestre - RS', '38', false);
    this.addInputRadio(alert, 'Caibi - SC', '4', false);
    this.addInputRadio(alert, 'Belmonte - SC', '18', false);
    this.addInputRadio(alert, 'Descanso - SC', '3', false);
    this.addInputRadio(alert, 'Erval Seco - RS', '46', false);
    this.addInputRadio(alert, 'Iporâ do Oeste - SC', '5', false);
    this.addInputRadio(alert, 'Itapiranga - SC', '28', false);
    this.addInputRadio(alert, 'Mondai - SC', '2', false);
    this.addInputRadio(alert, 'Novo Tiradentes - RS', '44', false);
    this.addInputRadio(alert, 'Planalto - RS', '45', false);
    this.addInputRadio(alert, 'Vista Gaúcha - RS', '55', false);
    this.addInputRadio(alert, 'Riqueza - SC', '6', false);
    this.addInputRadio(alert, 'Rodeio Bonito - RS', '41', false);
    this.addInputRadio(alert, 'Pinhal - RS', '43', false);
    this.addInputRadio(alert, 'Santa Helena - SC', '17', false);
    this.addInputRadio(alert, 'São João do Oeste - SC', '10', false);
    this.addInputRadio(alert, 'Tunápolis - SC', '35', false);

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.navCtrl.push(TabsPage);

        this.testRadioOpen = false;
        this.testRadioResult = data;

        this.configuracaoProvider.setConfigFilial(data);

        this.filialProvider.insert(data, 'Palmitos')         
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
