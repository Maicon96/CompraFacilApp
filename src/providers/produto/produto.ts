import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { HttpClient } from '@angular/common/http';
import { DatabaseProvider } from './../../providers/database/database';
import { UtilsProvider } from './../../providers/utils/utils';
import { RequestOptions, Request, RequestMethod, Headers } from '@angular/http';


@Injectable()
export class ProdutoProvider {

  public basePath = "/cooperapi";
  public baseUrl = "http://www.coopera1.com.br:48080/g3ws-comprafacil/pdv/consulta/load";
  //public baseUrl = "http://10.0.20.5:18080/g3ws-comprafacil/pdv/consulta/load";
                            

  constructor(private dbProvider: DatabaseProvider, private utilsProvider: UtilsProvider, 
    public http: HttpClient, private plataform: Platform) { 
      if (this.plataform.is("cordova")) {
        this.basePath = "http://www.coopera1.com.br";
      }
    }


  //funçoes de comunicaçao com API   

  public buscarProdutos(request: any) {

    const headers = new Headers({      
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    
    const options = new RequestOptions({  headers : headers });
    
    console.log("maicon - url : " + this.baseUrl + '/produtos');    
    console.log("maicon - headers : " + headers);    
    console.log("maicon - json : " + JSON.stringify(request));

    return this.http.post(this.baseUrl + '/produtos',  request)
    //.map(res => { res.json() })
    //.subscribe( data => console.log(data));

  }

  

  public buscarProdutosPopulares(request: any) {

    const headers = new Headers({      
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    console.log(request);

    const options = new RequestOptions({  headers : headers });
    
    console.log("maicon - url : " + this.baseUrl + '/produtos/populares');    
    console.log("maicon - headers : " + headers);    
    console.log("maicon - json : " + JSON.stringify(request));
    

    return this.http.post(this.baseUrl + '/produtos/populares',  request)
    //.map(res => { res.json() })
    //.subscribe( data => console.log(data));

  }

  //funçoes do banco de dados
  public insert(idLista: number, descricao: string, preco: number, quantidade: number) {
    return this.dbProvider.getBanco()
      .then((db: SQLiteObject) => {
        let sql = 'insert into produtos (id_lista, descricao, preco, quantidade)' +
          ' values (?,?,?,?)';

        descricao = this.utilsProvider.formatDescricao(descricao);

        let data = [idLista, descricao, preco, quantidade];

        return db.executeSql(sql, data);
      })
      .catch((e) => console.error("erro ao inserir produto " + e));
  }

  public update(idProduto: number, idLista: number, descricao: string, preco: number, quantidade: number) {
    return this.dbProvider.getBanco()
      .then((db: SQLiteObject) => {
        let sql = 'update produtos set id_lista = ?, descricao = ?, preco = ?, quantidade = ? ' +
          'where id = ?';

        descricao = this.utilsProvider.formatDescricao(descricao);

        let data = [idLista, descricao, preco, quantidade, idProduto];

        return db.executeSql(sql, data);
      })
      .catch((e) => console.error("erro ao atualizar produto " + e));
  }

  public remove(id: number) {
    return this.dbProvider.getBanco()
      .then((db: SQLiteObject) => {
        let sql = 'delete from produtos where id = ?';
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
