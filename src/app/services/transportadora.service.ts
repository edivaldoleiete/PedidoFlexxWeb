import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransportadoraService {

  constructor(private http: HttpClient) { }

  buscarDocumentoPorFantasia(doc: string) {
    if(doc == null || doc == '' || doc == undefined) {
      return this.http.get(`${environment.apiUrl}/transportadora`);
    }
    return this.http.get(`${environment.apiUrl}/transportadora?fantasia=${doc}`);
  }

}
