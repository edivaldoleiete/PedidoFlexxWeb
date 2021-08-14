import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }

  salvarPedido(pedido: any): any {
    return this.http.post(`${environment.apiUrl}/pedido`, pedido);
  }

  buscarPedidos() {
    return this.http.get(`${environment.apiUrl}/pedido`);
  }

}
