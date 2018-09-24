import { DatabaseProvider } from './../providers/database/database';
import { ConfiguracaoProvider } from './../providers/configuracao/configuracao';
import { IntroducaoPage } from './../pages/introducao/introducao';
import { Component } from '@angular/core';
import { Platform, Config, Tabs } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { timer } from 'rxjs/observable/timer';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html',
  providers: [
    ConfiguracaoProvider
  ]
})
export class MyApp {
  //rootPage:any = IntroducaoPage;
  //rootPage:any = TabsPage;
  rootPage:any = null;

  showSplash = true; 

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    configuracaoProvider: ConfiguracaoProvider, dbProvider: DatabaseProvider) {
    platform.ready().then(() => {

      let config = configuracaoProvider.getConfigData();   

      //if (config == null) {
      //  this.rootPage = IntroducaoPage;
      //  configuracaoProvider.setConfigData(false);
      //} else {
      //  this.rootPage = TabsPage;
      //}

      statusBar.styleDefault();
      //splashScreen.hide();
      //timer(3000).subscribe(() => this.showSplash = false)
      //this.abrirTabsPage(splashScreen);

      /*dbProvider.deletarTabelas()
        .then(() => {          
          console.log("sucesso ao deletar tabelas");
        })
        .catch(() => {          
          console.log("erro ao deletar tabelas");
        })*/

      dbProvider.createBanco()
        .then(() => {
          this.abrirTabsPage(splashScreen);
          console.log("sucesso ao criar banco");
       })
        .catch(() => {
          this.abrirTabsPage(splashScreen);
          console.log("erro ao criar banco");
        })
    });
  }

  private abrirTabsPage(splashScreen: SplashScreen) {
    //splashScreen.hide();
    //this.rootPage = IntroducaoPage;  
    this.rootPage = TabsPage;    
    //timer(3000).subscribe(() => this.showSplash = false)
    timer(5000).subscribe()
  }

  //preciso criar o banco antes de definir o root page

}
