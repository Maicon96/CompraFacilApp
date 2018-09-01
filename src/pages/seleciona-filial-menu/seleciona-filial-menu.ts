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

    this.addInputRadio(alert, 'Palmitos - SC', '1', true);    
    this.addInputRadio(alert, 'Alpestre - RS', '13', false);
    this.addInputRadio(alert, 'Caibi - SC', '4', false);
    this.addInputRadio(alert, 'Belmonte - SC', '8', false);
    this.addInputRadio(alert, 'Descanso - SC', '3', false);
    this.addInputRadio(alert, 'Erval Seco - RS', '19', false);
    this.addInputRadio(alert, 'Iporâ do Oeste - SC', '5', false);
    this.addInputRadio(alert, 'Itapiranga - SC', '9', false);
    this.addInputRadio(alert, 'Mondai - SC', '2', false);
    this.addInputRadio(alert, 'Novo Tiradentes - RS', '18', false);
    this.addInputRadio(alert, 'Planalto - RS', '12', false);
    this.addInputRadio(alert, 'Vista Gaúcha - RS', '20', false);
    this.addInputRadio(alert, 'Riqueza - SC', '6', false);
    this.addInputRadio(alert, 'Rodeio Bonito - RS', '15', false);
    this.addInputRadio(alert, 'Pinhal - RS', '17', false);
    this.addInputRadio(alert, 'Santa Helena - SC', '7', false);
    this.addInputRadio(alert, 'São João do Oeste - SC', '10', false);
    this.addInputRadio(alert, 'Tunápolis - SC', '11', false);

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'OK',
      handler: data => {
        console.log("chegou aqui");
        console.log("aqui : " + data);
        console.log("aqui : " + data.palmitos);        

        this.filialProvider.insert(data, 'Palmitos')        
        .then(() => console.log('sucesso ao inserir'))
        .catch((e) => console.error("erro ao inserir: " + e));

        this.filialProvider.getAll()        
        .then((result: any[]) => {
          console.log("listar");
          var filiais: any[] = result;
          console.log("filiais resultado: " + filiais);    
          console.log("filiais 0: " + filiais[0]);          
        })
        .catch((e) => console.error("erro ao buscar filiais: " + e));
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

