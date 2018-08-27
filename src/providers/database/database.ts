import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {

  }

  public createBanco() {
    return this.getBanco()
      .then((db: SQLiteObject) => {
        this.createTabelas(db)
        this.inserirItensDefault(db)
      })
      .catch(e => console.error(e));
  }

  public getBanco() {
    return this.sqlite.create({
      name: 'compraFacil.db',
      location: 'default'
    });
  }

  private createTabelas(db: SQLiteObject) {
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS filiais (id integer primary key AUTOINCREMENT NOT NULL, codigo integer NOTT NULL, descricao TEXT)']
    ])
      .then(() => console.log('Sucesso ao criar as tabelas'))
      .catch(e => console.error('Erro ao criar as tabelas do banco', e));
  }

  private inserirItensDefault(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from categories')
      .then((data: any) => {
        //se não existe registro
        if (data.rows.item(0).qtd == 0) {

          //criando as tabelas
          db.sqlBatch([
            ['insert into filiais (codigo, descricao) values (?)', ['1,Palmitos']]
          ])
          .then(() => console.log('Dados padrões inseridos'))
          .catch(e => console.error('Erro ao incluir dados padroes', e));

        }
      })
      .catch(e => console.error('Erro ao consultar a qtd de categorias', e));      
  }



}
