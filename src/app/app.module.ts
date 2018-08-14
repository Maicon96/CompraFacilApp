import { PromocoesPageModule } from './../pages/promocoes/promocoes.module';
import { SelecionaFilialMenuPageModule } from './../pages/seleciona-filial-menu/seleciona-filial-menu.module';
import { PerfilPageModule } from './../pages/perfil/perfil.module';
import { SelecionaFilialPageModule } from './../pages/seleciona-filial/seleciona-filial.module';

import { IntroducaoPageModule } from './../pages/introducao/introducao.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
    PromocoesPageModule    
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
