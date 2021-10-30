import { Component, OnInit, TemplateRef } from '@angular/core';
import { ClienteServiceService } from '../services/cliente-service.service';
import { CondicaoPagamentoService } from '../services/condicao-pagamento.service';
import { DescontoService } from '../services/desconto.service';
import { TabelaDePrecoService } from '../services/tabela-de-preco.service';
import { TransportadoraService } from '../services/transportadora.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { FormControl } from '@angular/forms';
import { ProdutoService } from '../services/produto.service';
import { Pedido } from '../models/pedido';
import { PedidoService } from '../services/pedido.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PedidoItem } from '../models/pedido-item.model';
import { error } from 'selenium-webdriver';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
defineLocale('pt-br', ptBrLocale); 

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  cgcCliente: string = '';
  razaoCliente: string = '';
  estadoCliente: string = '';

  cgcTransportadora: string = '';
  razaoTransportadora: string = '';

  descricaoCondicaoPagamento: string = '';
  codigoCondicaoPagamento: string = '';

  descricaoDesconto: string = '';
  codigoDesconto: string = '';

  descricaoTabela: string = '';
  codigoTabela: string = '';

  produto: any = null;
  
  modalRef: BsModalRef;

  buscaCliente = new FormControl();
  buscaTransportadora = new FormControl();
  buscaCondPagto = new FormControl();
  buscaDesconto = new FormControl();
  buscaTabela = new FormControl();
  buscaProduto = new FormControl();

  valorDesconto = new FormControl();
  valorFrete = new FormControl();
  dataBaseVencimento = new FormControl();
  dataEntrega = new FormControl();
  numeroOC = new FormControl();
  observacoes = new FormControl();
  valorTotal = new FormControl();

  listaClientes: any = [];
  listaTransportadoras: any = [];
  listaCondPagto: any = [];
  listaDesconto: any = [];
  listaTabela: any = [];

  listaProdutos: any = [];
  listaItensPedido: any = [];

  pedido: Pedido = new Pedido();

  idPedido = null;
 
  constructor(
    private clienteService: ClienteServiceService,
    private transportadoraService: TransportadoraService,
    private CondicaoPagamentoService: CondicaoPagamentoService,
    private descontoService: DescontoService,
    private tabelaService: TabelaDePrecoService,
    private modalService: BsModalService,
    private produtoService: ProdutoService,
    private pedidoService: PedidoService,
    private localeService: BsLocaleService
  ) { 
    localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.pedido.codigoVendedor = 1;
    this.buscarItensPedido();
  }

  buscarDocumentoCliente() {
      this.clienteService.buscarDocumentoPorFantasia(this.buscaCliente.value).subscribe(
        res => {
          console.log(res);
          this.listaClientes = res;
        },
        error => {
          console.log(error)
        }
      );
  }

  buscarDocumentoTransportadora() {
    this.transportadoraService.buscarDocumentoPorFantasia(this.buscaTransportadora.value).subscribe(
      res => {
        this.listaTransportadoras = res;
      },
      error => {
        console.log(error)
      }
    );
  }

  buscarCondicaoPagamento() {
    this.CondicaoPagamentoService.buscarPorDescricao(this.buscaCondPagto.value).subscribe(
      res => {
        this.listaCondPagto = res;
      },
      error => {
        console.log(error)
      }
    );
  }

  buscarDesconto() {
    this.descontoService.buscarPorDescricao(this.buscaDesconto.value).subscribe(
      res => {
        this.listaDesconto = res;
      },
      error => {
        console.log(error)
      }
    );
  }

  buscarTabelaPreco() {
    this.tabelaService.buscaPorId(this.buscaTabela.value).subscribe(
      res => {
        this.listaTabela = res;
      },
      error => {
        console.log(error)
      }
    );
  }

  buscarProduto() {
    this.produtoService.buscarPorDescricao(this.buscaProduto.value, this.estadoCliente, this.codigoTabela).subscribe(
      res => {
        this.listaProdutos = res;
      },
      error => {
        console.log(error)
      }
    );
  }

  selecionarCliente(cliente) {
    this.cgcCliente = cliente.cgc;
    this.razaoCliente = cliente.razao;
    this.pedido.cgcCliente = cliente.cgc;
    this.estadoCliente = cliente.estado;
  }

  selecionarTransportadora(transportadora) {
    this.cgcTransportadora = transportadora.cgc;
    this.razaoTransportadora = transportadora.razao;
    this.pedido.idTransportadora = transportadora.codigo;
  }

  selecionarCondPagto(cond) {
    this.codigoCondicaoPagamento = cond.codigo;
    this.descricaoCondicaoPagamento = cond.descricao;
    this.pedido.codigoCondicaoPagamento = cond.codigo;
  }

  selecionarDesconto(desconto) {
    this.codigoDesconto = desconto.codigo_desconto;
    this.descricaoDesconto = desconto.descricao_desconto;
    this.pedido.codigoDesconto = desconto.codigo_desconto;
  }

  selecionarTabela(tabela) {
    this.codigoTabela = tabela.id;
    this.descricaoTabela = tabela.id;
    this.pedido.codigoTabela = tabela.id;
  }

  selecionarProduto(produto) {
    this.produto = produto;
  }

  salvarDadosPedido() {
    this.pedido.dataBaseVencimento = this.dataBaseVencimento.value;
    this.pedido.dataEntrega = this.dataEntrega.value;
    this.pedido.numeroOC = this.numeroOC.value;
    this.pedido.observacoes = this.observacoes.value;
    this.pedido.valorDesconto = this.valorDesconto.value;
    this.pedido.valorFrete = this.valorFrete.value;
    console.log(`AQUIIIIIII`)
    this.pedidoService.salvarPedido(this.pedido).subscribe(data => { 
      console.log(data, `aqui2`)
      if(data.erro != null) {
        alert(data.erro[0].erro)
      } else {
        this.idPedido = data[0].idpedido
        alert('Sucesso ao cadastrar pedido');
      }
     });
  }

  salvarItemPedido(produto) {
    let pedidoItem = new PedidoItem();
    pedidoItem.idPedido = this.idPedido;
    console.log(produto)
    pedidoItem.codigoProduto = produto;
    pedidoItem.quantidade = Number((<HTMLInputElement>document.getElementById(produto)).value);

    this.produtoService.salvarItemPedido(pedidoItem).subscribe(
      res => {
        alert('Sucesso ao salvar item ao pedido!')
        this.buscarItensPedido()
      },
      error => {
        console.log(error)
      }
    );
  }

  buscarItensPedido() {
    this.produtoService.listaItensPedido(this.idPedido).subscribe(
      res => {
        if(res != null) {
          this.listaItensPedido = res;
        } else {
          this.listaItensPedido = [];
        }
      },
      error => {
        console.log(error)
      }
    );
  }

  apagarItemPedido(idItem: string) {
    this.produtoService.apagaItemPedido(idItem, this.idPedido).subscribe(
      res => {
        alert('Produto excluído com sucesso')
        this.buscarItensPedido();
      },
      error => {
        alert('Erro ao excluir produto')
        console.log(error)
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-lg' };
    this.modalRef = this.modalService.show(template, config);
  }

}
