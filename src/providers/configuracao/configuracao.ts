import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

let config_key_name = "config";

@Injectable()
export class ConfiguracaoProvider {

  private config = {
    mostrarIndrotucao: false
  }

  constructor() {

  }

  //recupera os dados do localstorage
  getConfigData(): any {
    return localStorage.getItem(config_key_name);
  }

  //grava os dados no localstorage
  setConfigData(mostrarIndrotucao?: boolean) {
    let config = {
      mostrarIndrotucao: false
    }

    if (mostrarIndrotucao) {
      config.mostrarIndrotucao = mostrarIndrotucao;
    }

    localStorage.setItem(config_key_name, JSON.stringify(config));
  }

}
