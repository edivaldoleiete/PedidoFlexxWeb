import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-pedidos-listagem',
  templateUrl: './pedidos-listagem.component.html',
  styleUrls: ['./pedidos-listagem.component.css']
})
export class PedidosListagemComponent implements OnInit {

  listaPedidos: any = [];
  linkImpressao = `${environment.apiUrl}/orcamento`;

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.buscarPedidos();
  }

  buscarPedidos() {
    this.pedidoService.buscarPedidos().subscribe(
      res => {
        this.listaPedidos = res;
      },
      error => {

      }
    );
  }

  imprimirPedido(idPedido) {
    window.open(this.linkImpressao + '?pedido='+idPedido, '_blank');
  }

}
