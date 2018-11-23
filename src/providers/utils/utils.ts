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

}
