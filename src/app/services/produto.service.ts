import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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

}
