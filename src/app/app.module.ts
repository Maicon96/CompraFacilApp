import { ModalBuscarProdutoPageModule } from './../pages/modal-buscar-produto/modal-buscar-produto.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ModalProdutoPageModule } from './../pages/modal-produto/modal-produto.module';
import { ListaPageModule } from './../pages/lista/lista.module';
import { NovaListaPageModule } from './../pages/nova-lista/nova-lista.module';
import { ProdutosPageModule } from './../pages/produtos/produtos.module';
import { MinhaListaPageModule } from './../pages/minha-lista/minha-lista.module';
import { PromocoesPageModule } from './../pages/promocoes/promocoes.module';
import { SelecionaFilialMenuPageModule } from './../pages/seleciona-filial-menu/seleciona-filial-menu.module';
import { PerfilPageModule } from './../pages/perfil/perfil.module';
import { SelecionaFilialPageModule } from './../pages/seleciona-filial/seleciona-filial.module';

import { IntroducaoPageModule } from './../pages/introducao/introducao.module';
import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfiguracaoProvider } from '../providers/configuracao/configuracao';

import { SQLite } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../providers/database/database';
import { SelecionaFilialProvider } from '../providers/seleciona-filial/seleciona-filial';
import { ListaProvider } from '../providers/lista/lista';
import { ProdutoProvider } from '../providers/produto/produto';
import { UtilsProvider } from '../providers/utils/utils';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Network } from '@ionic-native/network';
import { Vibration } from '@ionic-native/vibration'

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)


//import { CurrencyMaskModule } from "ng2-currency-mask";
//import { BrMaskerModule } from 'brmasker-ionic-3';
//import { BrMaskModel } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage
  ],
  imports: [  
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IntroducaoPageModule,
    SelecionaFilialPageModule,
    PerfilPageModule,
    SelecionaFilialMenuPageModule,
    PromocoesPageModule,
    MinhaListaPageModule,
    ProdutosPageModule,
    NovaListaPageModule,
    ListaPageModule,
    ModalProdutoPageModule,
    ModalBuscarProdutoPageModule,
    HttpModule,
    HttpClientModule,          
    //IonMaskModule.forRoot()
    //InputMaskModule 
    //CurrencyMaskModule   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: LOCALE_ID, useValue: 'pt-BR'
    },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfiguracaoProvider,
    SQLite,
    DatabaseProvider,
    SelecionaFilialProvider,
    ListaProvider,
    ProdutoProvider,
    UtilsProvider,
    BarcodeScanner,
    Network,
    UtilsProvider,
    Vibration
  ]
})
export class AppModule {}
