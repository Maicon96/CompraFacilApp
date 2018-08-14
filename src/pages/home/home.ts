import { PerfilPage } from './../perfil/perfil';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  rootPage = PerfilPage;
  constructor(public navCtrl: NavController) {

  }

}
