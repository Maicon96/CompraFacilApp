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
    NovaListaPageModule    
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
    {provide: LOCALE_ID, useValue: 'pt-BR'},//defino isso para os formatos dos valores serem brasileiros como os numericos por exe
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfiguracaoProvider,
    SQLite,
    DatabaseProvider,
    SelecionaFilialProvider
  ]
})
export class AppModule {}
