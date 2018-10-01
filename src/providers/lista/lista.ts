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

  public update(idLista: number, idFilial: number, descricao: string, valor_total: number, valor_gastar: number, 
    data_criacao: string) {
    return this.dbProvider.getBanco()
      .then((db: SQLiteObject) => {
        let sql = 'update listas set id_filial = ?, descricao = ?, valor_total = ?, valor_gastar = ?,'
        ' data_cricao = ? where id = ?';

        console.log("lista - idFilial " + idFilial);
        console.log("lista - descricao " + descricao);
        console.log("lista - valor_total " + valor_total);
        console.log("lista - valor_gastar " + valor_gastar);
        console.log("lista - data_criacao " + data_criacao);
        console.log("lista - idLista " + idLista);
        console.log("lista - " + sql);

        let data = [idFilial, descricao, valor_total, valor_gastar, data_criacao, idLista];

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
                lista.data_criacao = data.rows.item(i).data_cricao;
                
                console.log("maicon descricao - " + lista.descricao);
                console.log("maicon data_criacao - " + lista.data_criacao);

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

}

export class Lista {
  id: number;
  idFilial: number;
  descricao: string;
  valor_total: number;
  valor_gastar: number;
  data_criacao: string;
}
