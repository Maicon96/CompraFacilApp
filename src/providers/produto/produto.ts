import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './../../providers/database/database';


@Injectable()
export class ProdutoProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(idLista: number, descricao: string, preco: number, quantidade: number) {
    return this.dbProvider.getBanco()
      .then((db: SQLiteObject) => {
        let sql = 'insert into produtos (id_lista, descricao, preco, quantidade)' +
         ' values (?,?,?,?)';
        let data = [idLista, descricao, preco, quantidade];

        return db.executeSql(sql, data);
      })
      .catch((e) => console.error("erro ao inserir produto " + e));
  }

  public update(idProduto:number, idLista: number, descricao: string, preco: number, quantidade: number) {   
    return this.dbProvider.getBanco()
      .then((db: SQLiteObject) => {
        let sql = 'update produtos set id_lista = ?, descricao = ?, preco = ?, quantidade = ? ' +
         'where id = ?';
        let data = [idLista, descricao, preco, quantidade, idProduto];

        return db.executeSql(sql, data);
      })
      .catch((e) => console.error("erro ao atualizar produto " + e));
  }

  public remove(id: number) {
    return this.dbProvider.getBanco()
      .then((db: SQLiteObject) => {
        let sql = 'delete from produtos where id = ?' ; 
        let data = [id];

        return db.executeSql(sql, data);
      })
      .catch((e) => console.error("erro ao remover produto  " + e));
  }

  public getAll(idLista: number) {
    return this.dbProvider.getBanco()
      .then((db: SQLiteObject) => {
        let sql = 'select * from produtos where id_lista = ? order by descricao asc'
        let data = [idLista];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let produtos = new Array<Produto>();

              for (var i = 0; i < data.rows.length; i++) {
                let produto = new Produto();
                produto.id = data.rows.item(i).id;
                produto.idLista = data.rows.item(i).id_lista;
                produto.descricao = data.rows.item(i).descricao;                
                produto.preco = data.rows.item(i).preco;
                produto.quantidade = data.rows.item(i).quantidade;                
                
                produtos.push(produto);
              }

              return produtos;
            } else {
              return [];
            }
          })
          .catch((e) => console.error("erro ao buscar produtos: " + e));
      })
      .catch((e) => console.error(e));
  }

}

export class Produto {
  id: number;
  idLista: number;
  descricao: string;
  preco: number;
  quantidade: number;  
}