import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PedidoItem } from '../models/pedido-item.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  buscarPorDescricao(doc: string) {
    if(doc == null || doc == undefined || doc == '') {
      return this.http.get(`${environment.apiUrl}/produto`);
    }
    return this.http.get(`${environment.apiUrl}/produto?produto=${doc}`);
  }

  salvarItemPedido(item: PedidoItem) {
    //const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    return this.http.post(`${environment.apiUrl}/produto`, item);
  }

  listaItensPedido(pedido: string) {
    return this.http.get(`${environment.apiUrl}/listaitens?pedido=${pedido}`);
  }

  apagaItemPedido(idItem: string, idPedido: number) {
    return this.http.delete(`${environment.apiUrl}/produto?produto=${idItem}&pedido=${idPedido}`);
  }

}
