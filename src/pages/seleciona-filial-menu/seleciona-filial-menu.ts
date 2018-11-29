import { SelecionaFilialProvider } from './../../providers/seleciona-filial/seleciona-filial';
import { ConfiguracaoProvider } from './../../providers/configuracao/configuracao';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-seleciona-filial-menu',
  templateUrl: 'seleciona-filial-menu.html',
})
export class SelecionaFilialMenuPage {

  private testRadioOpen;
  private testRadioResult;
  filial: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public filialProvider: SelecionaFilialProvider, public configuracaoProvider: ConfiguracaoProvider) { }

  addInputRadio(alert, label: string, value: string, checked: boolean) {
    alert.addInput({
      type: 'radio',
      label: label,
      value: value,
      checked: checked
    });
  }  

  selecionarFilial() {        
    if (this.filial) {
      this.configuracaoProvider.setConfigFilial(this.filial);      
    
      const alert = this.alertCtrl.create({
        title: 'Sucesso ao definir filial!',      
        buttons: ['OK']
      });
      alert.present();
    } else {
      const alert = this.alertCtrl.create({
        title: 'Selecione uma filial!',      
        buttons: ['OK']
      });
      alert.present();
    }  

  }  
  

}

