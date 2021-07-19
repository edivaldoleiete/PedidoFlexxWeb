import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {

  constructor(private http: HttpClient) { }

  buscarDocumentoPorFantasia(doc: string) {
    if(doc == null || doc == undefined || doc == ''){
      return this.http.get(`${environment.apiUrl}/cliente`);
    }
    return this.http.get(`${environment.apiUrl}/cliente?fantasia=${doc}`);
  }
  
}
