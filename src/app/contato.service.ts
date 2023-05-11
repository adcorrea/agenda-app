import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contato } from './contato/contato';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.prod';




@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  url: string = environment.apiUrlBase + '/api/contatos';

  constructor(private http: HttpClient) { }


  save(contato: Contato):Observable<Contato>{
    return this.http.post<Contato>(this.url, contato);
  }

  list():Observable<Contato[]>{
    return this.http.get<Contato[]>(this.url);
  }

  toFavorite(contato: Contato):Observable<any>{
    return this.http.patch(`${this.url}/${contato.id}/favorito`, null);
  }
}
