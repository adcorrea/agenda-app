import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contato } from './contato/contato';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.prod';
import { Form } from '@angular/forms';
import { PaginaContato } from './contato/paginaContato';




@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  url: string = environment.apiUrlBase + '/api/contatos';

  constructor(private http: HttpClient) { }


  save(contato: Contato):Observable<Contato>{
    return this.http.post<Contato>(this.url, contato);
  }

  list(page: number, size: number):Observable<PaginaContato>{
    const params = new HttpParams()
                          .set('page', page)
                          .set('size', size);

    return this.http.get<PaginaContato>(`${this.url}?${params.toString()}`);
  }

  toFavorite(contato: Contato):Observable<any>{
    return this.http.patch(`${this.url}/${contato.id}/favorito`, null);
  }

  upload(contato: Contato, formData: FormData): Observable<any>{
    return this.http.patch<any>(`${this.url}/${contato.id}/foto`, formData);
  }
}
