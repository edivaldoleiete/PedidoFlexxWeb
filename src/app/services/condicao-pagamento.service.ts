import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CondicaoPagamentoService {

  constructor(private http: HttpClient) { }

  buscarPorDescricao(doc: string) {
    if(doc == null || doc == undefined || doc == ''){
      return this.http.get(`${environment.apiUrl}/condpagamento`);
    }
    return this.http.get(`${environment.apiUrl}/condpagamento?descricao=${doc}`);
  }

}
