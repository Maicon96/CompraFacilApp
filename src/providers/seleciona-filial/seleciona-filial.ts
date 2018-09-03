import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './../../providers/database/database';


@Injectable()
export class SelecionaFilialProvider {

  constructor(private dbProvider: DatabaseProvider) { }


  public insert(codigo: number, descricao: string) {
    return this.dbProvider.getBanco()
      .then((db: SQLiteObject) => {
        let sql = 'insert into filiais (codigo, descricao) values (?,?)';
        let data = [codigo, descricao];

        return db.executeSql(sql, data);
      })
      .catch((e) => console.error("erro ao inserir filial: " + e));
  }

  public get(id: number) {
    return this.dbProvider.getBanco()
      .then((db: SQLiteObject) => {
        let sql = 'select * from filiais where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let filial = new FilialSupermercado();
              filial.id = item.id;
              filial.codigo = item.codigo;
              filial.descricao = item.descricao;
            } else {
              return null;
            }

          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll() {
    return this.dbProvider.getBanco()
      .then((db: SQLiteObject) => {
        let sql = 'select * from filiais'

        return db.executeSql(sql, [])
          .then((data: any) => {
            if (data.rows.length > 0) {
              let filiais = new Array<FilialSupermercado>();

              for (var i = 0; i < data.rows.length; i++) {
                let filial = new FilialSupermercado();
                filial.id = data.rows.item(i).id;
                filial.codigo = data.rows.item(i).codigo;
                filial.descricao = data.rows.item(i).descricao;

                filiais.push(filial);
              }

              return filiais;
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
        let sql = 'select * from filiais order by id desc limit 1';
        
        return db.executeSql(sql, [])
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              return item.codigo;              
            } else {
              return null;
            }

          })
          .catch((e) => console.error("erro ao buscar ultima filial " + e));
      })
      .catch((e) => console.error("erro ao buscar ultima filial " + e));
  }

}

export class FilialSupermercado {
  id: number;
  codigo: number;
  descricao: string;
}
