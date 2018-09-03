import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './../../providers/database/database';

@Injectable()
export class ListaProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(idFilial: number, descricao: string, valor_total: number, valor_gastar: number, 
    data_criacao: string) {
    return this.dbProvider.getBanco()
      .then((db: SQLiteObject) => {
        let sql = 'insert into listas (id_filial, descricao, valor_total, valor_gastar, data_cricao)' +
         ' values (?,?,?,?,?)';
        let data = [idFilial, descricao, valor_total, valor_gastar, 
          data_criacao];

        return db.executeSql(sql, data);
      })
      .catch((e) => console.error("erro ao inserir lista  " + e));
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

  public getAll() {
    return this.dbProvider.getBanco()
      .then((db: SQLiteObject) => {
        let sql = 'select * from listas order by descricao asc'

        return db.executeSql(sql, [])
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

}

export class Lista {
  id: number;
  idFilial: number;
  descricao: string;
  valor_total: number;
  valor_gastar: number;
  data_criacao: string;
}
