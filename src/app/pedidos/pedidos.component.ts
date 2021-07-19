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

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  cgcCliente: string = '';
  razaoCliente: string = '';

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

  pedido: Pedido = new Pedido();
 
  constructor(
    private clienteService: ClienteServiceService,
    private transportadoraService: TransportadoraService,
    private CondicaoPagamentoService: CondicaoPagamentoService,
    private descontoService: DescontoService,
    private tabelaService: TabelaDePrecoService,
    private modalService: BsModalService,
    private produtoService: ProdutoService,
    private pedidoService: PedidoService
  ) { }

  ngOnInit(): void {
  //   this.produto.descricao = '';
  //   this.produto.codigo = '';
    this.pedido.codigoVendedor = 1;
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
    this.produtoService.buscarPorDescricao(this.buscaProduto.value).subscribe(
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

  salvarPedido() {
    this.pedido.dataBaseVencimento = this.dataBaseVencimento.value;
    this.pedido.dataEntrega = this.dataEntrega.value;
    this.pedido.numeroOC = this.numeroOC.value;
    this.pedido.observacoes = this.observacoes.value;
    this.pedido.valorDesconto = this.valorDesconto.value;
    this.pedido.valorFrete = this.valorFrete.value;

    this.pedidoService.salvarPedido(this.pedido).subscribe(
      res => {
        alert('Sucesso ao cadastrar pedido');
      },
      error => {
        console.log(error)
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-lg' };
    this.modalRef = this.modalService.show(template, config);
  }

}
