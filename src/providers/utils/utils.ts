import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';

@Injectable()
export class UtilsProvider {
  
  
  constructor(private network: Network) {       
  }

  //transforma a descrição em palavras com a primeira letra maisucula e o resto minuscula
  public formatDescricao(str: string) {
    str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });

    return str;
  }

  //verifica se contem rede 
  public verificaConexao(conexao) {
    if (this.network.type === 'none') {
      conexao = false;
    }
  }

  public getNomeFilial(codigoFilial) {
    if (codigoFilial == 1) {
      return "Palmitos - SC"
    } else if (codigoFilial == 38) {
      return "Alpestre - RS"
    } else if (codigoFilial == 4) {
      return "Caibi - SC"
    } else if (codigoFilial == 18) {
      return "Belmonte - SC"
    } else if (codigoFilial == 3) {
      return "Descanso - SC"
    } else if (codigoFilial == 46) {
      return "Erval Seco - RS"
    } else if (codigoFilial == 5) {
      return "Iporâ do Oeste - SC"
    } else if (codigoFilial == 28) {
      return "Itapiranga - SC"
    } else if (codigoFilial == 2) {
      return "Mondai - SC"
    } else if (codigoFilial == 44) {
      return "Novo Tiradentes - RS"
    } else if (codigoFilial == 55) {
      return "Vista Gaúcha - RS"
    } else if (codigoFilial == 6) {
      return "Riqueza - SC"
    } else if (codigoFilial == 41) {
      return "Rodeio Bonito - RS"
    } else if (codigoFilial == 43) {
      return "Pinhal - RS"
    } else if (codigoFilial == 17) {
      return "Santa Helena - SC"
    } else if (codigoFilial == 10) {
      return "São João do Oeste - SC"
    } else if (codigoFilial == 35) {
      return "Tunápolis - SC"
    }
    
  }

}
