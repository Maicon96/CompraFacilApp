import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

let config_key_name = "config";
let filial_key_name = "idFilial";

@Injectable()
export class ConfiguracaoProvider {

  private config = {
    mostrarIndrotucao: false
  }

  constructor() {

  }

  getConfigData(): any {
    return localStorage.getItem(config_key_name);
  }

  setConfigData(mostrarIndrotucao?: boolean) {
    let config = {
      mostrarIndrotucao: false
    }

    if (mostrarIndrotucao) {
      config.mostrarIndrotucao = mostrarIndrotucao;
    }

    localStorage.setItem(config_key_name, JSON.stringify(config));
  }

  getConfigFilial(): any {   
    let obj = JSON.parse(localStorage.getItem(filial_key_name));    

    console.log(obj.filial);
    return obj.filial;
  }

  setConfigFilial(filial: number) {
    localStorage.setItem(filial_key_name, JSON.stringify({filial: filial}));
  }

}
