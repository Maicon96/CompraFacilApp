import { SelecionaFilialMenuPage } from './../seleciona-filial-menu/seleciona-filial-menu';
import { Component } from '@angular/core';

import { PromocoesPage } from '../promocoes/promocoes';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html' 
})


export class TabsPage {
  public tab1;
  public tab2;
  public tab3;
  public tab4;

  constructor() {
    this.tab1 = HomePage;
    this.tab2 = PromocoesPage;
    this.tab3 = SelecionaFilialMenuPage;
    
  }

}
