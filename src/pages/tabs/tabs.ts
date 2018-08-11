import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
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
    this.tab2 = AboutPage;
    this.tab3 = ContactPage;
    this.tab4 = ContactPage;  
  }

}
