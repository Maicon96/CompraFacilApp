import { PerfilPage } from './../perfil/perfil';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from './../about/about';
import { MinhaListaPage } from './../minha-lista/minha-lista';
import { ProdutosPage } from './../produtos/produtos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  rootPage = PerfilPage;
  constructor(public navCtrl: NavController) {

  }

  public chamaProdutos() {
    this.navCtrl.push(ProdutosPage);
  }

  public chamaMinhasListas() {
    this.navCtrl.push(MinhaListaPage);
  }

  public chamaSobre() {
    this.navCtrl.push(AboutPage);
  }

  

  

}
