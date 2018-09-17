import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {

  }

  public deletarTabelas() {
    return this.getBanco()
      .then((db: SQLiteObject) => {
        this.dropTabelas(db)        
      })
      .catch(e => console.error(e));
  }

  public createBanco() {
    return this.getBanco()
      .then((db: SQLiteObject) => {
        this.createTabelas(db)
        //this.inserirItensDefault(db)
      })
      .catch(e => console.error(e));
  }

  public getBanco() {
    return this.sqlite.create({
      name: 'compraFacil.db',
      location: 'default'
    });
  }

  //DROP TABLE addresses;

  dropTabelas(db: SQLiteObject) {
    db.sqlBatch([
      ['DROP TABLE IF EXISTS compraFacil.produtos'],
      ['DROP TABLE IF EXISTS compraFacil.listas']
    ])
      .then(() => console.log('Sucesso ao dropar do banco'))
      .catch(e => console.error('Erro ao dropar do banco', e));
  }

  private createTabelas(db: SQLiteObject) {
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS filiais (id integer primary key AUTOINCREMENT NOT NULL, codigo integer NOTT NULL, descricao TEXT)'],
      ['CREATE TABLE IF NOT EXISTS listas (id integer primary key AUTOINCREMENT NOT NULL, id_filial integer NOT NULL, descricao TEXT NOT NULL, valor_total NUMERIC(10,2), valor_gastar NUMERIC(10,2), data_criacao varchar(255) )'],
      ['CREATE TABLE IF NOT EXISTS produtos (id integer primary key AUTOINCREMENT NOT NULL, id_lista integer NOT NULL, descricao TEXT NOT NULL, preco numeric(10,2) NOT NULL, quantidade integer NOT NULL)']
    ])
      .then(() => console.log('Sucesso ao criar tabelas do banco'))
      .catch(e => console.error('Erro ao criar tabelas do banco', e));
  }

  /*private inserirItensDefault(db: SQLiteObject) {
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
  }*/



}
