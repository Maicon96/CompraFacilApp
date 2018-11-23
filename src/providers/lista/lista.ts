import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './../../providers/database/database';

@Injectable()
export class ListaProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public formatDescricaoLista(str: string) {
    str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });

    return str;
  }

  public insert(idFilial: number, descricao: string, valor_total: number, valor_gastar: number, 
    data_criacao: string) {
    return this.dbProvider.getBanco()
      .then((db: SQLiteObject) => {
        let sql = 'insert into listas (id_filial, descricao, valor_total, valor_gastar, data_criacao)' +
         ' values (?,?,?,?,?)';

        descricao = this.formatDescricaoLista(descricao);

        let data = [idFilial, descricao, valor_total, valor_gastar, 
          data_criacao];

        return db.executeSql(sql, data);
      })
      .catch((e) => console.error("erro ao inserir lista  " + e));
  }

  public update(idLista: number, idFilial: number, descricao: string, valor_total: number, valor_gastar: number, 
    data_criacao: string) {
          
    return this.dbProvider.getBanco()
      .then((db: SQLiteObject) => {
        let sql = 'update listas set id_filial = ?, descricao = ?, valor_total = ?, valor_gastar = ?, data_criacao = ? where id = ?';
        
        descricao = this.formatDescricaoLista(descricao);

        let data = [idFilial, descricao, valor_total, valor_gastar, data_criacao, idLista];
        
        console.log("maicon - sql: " + sql);    

        return db.executeSql(sql, data);
      })
      .catch((e) => console.error("erro ao atualizar lista " + e));
  }

  public updateValorTotal(idLista: number, valor_total: number) {
    return this.dbProvider.getBanco()
      .then((db: SQLiteObject) => {
        let sql = 'update listas set valor_total = ? where id = ?';
        
        let data = [valor_total, idLista];

        return db.executeSql(sql, data);
      })
      .catch((e) => console.error("erro ao atualizar lista " + e));
  }

  public remove(id: number) {
    return this.dbProvider.getBanco()
      .then((db: SQLiteObject) => {
        let sql = 'delete from listas where id = ?' ; 
        let data = [id];

        return db.executeSql(sql, data);
      })
      .catch((e) => console.error("erro ao remover lista  " + e));
  }

  public getAll(idFilial: number) {
    return this.dbProvider.getBanco()
      .then((db: SQLiteObject) => {
        let sql = 'select * from listas where id_filial = ? order by descricao asc'
        let data = [idFilial];
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let listas = new Array<Lista>();

              for (var i = 0; i < data.rows.length; i++) {
                let lista = new Lista();
                lista.id = data.rows.item(i).id;
                lista.idFilial = data.rows.item(i).codigo;
                lista.descricao = data.rows.item(i).descricao;
                lista.valor_total = data.rows.item(i).valor_total;
                lista.valor_gastar = data.rows.item(i).valor_gastar;
                lista.data_criacao = data.rows.item(i).data_criacao;

                console.log("maicon - valor  sql " + lista.valor_total);
                
                listas.push(lista);
              }

              return listas;
            } else {
              return [];
            }
          })
          .catch((e) => console.error("erro ao buscar filiais: " + e));
      })
      .catch((e) => console.error(e));
  }

  public getLasted() {
    return this.dbProvider.getBanco()
      .then((db: SQLiteObject) => {
        let sql = 'select * from listas order by id desc limit 1';
        
        return db.executeSql(sql, [])
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              return item.id;              
            } else {
              return null;
            }

          })
          .catch((e) => console.error("erro ao buscar ultima lista " + e));
      })
      .catch((e) => console.error("erro ao buscar ultima lista " + e));
  }

  public existsLista(idFilial: number) {
    return this.dbProvider.getBanco()
      .then((db: SQLiteObject) => {
        let sql = 'select id from listas where id_filial = ? limit 1';
        
        let data = [idFilial];

        console.log(sql);
        console.log(data);

        return db.executeSql(sql, data)
          .then((data: any) => {
            console.log("maicon - aq");
            console.log(data);
            if (data.rows.length > 0) {
              return true;    
            } else {
              console.log("aqo");
              return false;
            }
  
          })
          .catch((e) => console.error("erro ao buscar lista " + e));
      })
      .catch((e) => console.error("erro ao buscar lista " + e));
    }  

}



export class Lista {
  id: number;
  idFilial: number;
  descricao: string;
  valor_total: number;
  valor_gastar: number;
  data_criacao: string;
}
