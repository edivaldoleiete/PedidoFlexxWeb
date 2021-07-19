import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DescontoService {

  constructor(private http: HttpClient) { }

  buscarPorDescricao(doc: string) {
    if(doc == null || doc == undefined || doc == '') {
      return this.http.get(`${environment.apiUrl}/desconto`);
    }
    return this.http.get(`${environment.apiUrl}/desconto?descricao=${doc}`);
  }
  
}
