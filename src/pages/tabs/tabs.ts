import { ProdutosPage } from './../produtos/produtos';
import { MinhaListaPage } from './../minha-lista/minha-lista';
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
    this.tab1 = PromocoesPage;
    this.tab2 = MinhaListaPage;
    this.tab3 = ProdutosPage;    
    this.tab4 = SelecionaFilialMenuPage;

    
    
  }

}
