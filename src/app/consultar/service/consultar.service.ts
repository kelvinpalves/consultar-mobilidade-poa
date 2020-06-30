import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConsultarService {

  private readonly URL_LOTACAO: string = "http://www.poatransporte.com.br/php/facades/process.php?a=nc&p=%25&t=l";
  private readonly URL_ONIBUS: string = "http://www.poatransporte.com.br/php/facades/process.php?a=nc&p=%25&t=o";
  private readonly URL_ITINERARIO: string = "http://www.poatransporte.com.br/php/facades/process.php?a=il&p=";

  constructor(
    private http: HttpClient) { }

  consultarLotacao(): Observable<any> {
    return this.http.get(this.URL_LOTACAO);
  }

  consultarOnibus(): Observable<any> {
    return this.http.get(this.URL_ONIBUS);
  }
  
  consultarItenerario(id: string): Observable<any> {
    return this.http.get(this.URL_ITINERARIO + id);
  }

}
