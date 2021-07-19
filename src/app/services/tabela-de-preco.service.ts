import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TabelaDePrecoService {

  constructor(private http: HttpClient) { }

  buscaPorId(id: number) {
    if(id == null || id == undefined){
      return this.http.get(`${environment.apiUrl}/tabela`);
    }
    return this.http.get(`${environment.apiUrl}/tabela?id=${id}`);
  }
  
}
