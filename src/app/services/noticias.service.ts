import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { delay } from 'rxjs/operators'

import { environment } from '../../environments/environment';


const apiKey=environment.apiKey;
const apiUrl=environment.apiUrl;

const headers= new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headLinePage=0;
  categoriaActual="";
  categoriaPage=0;
  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>( query: string ){

    query=apiUrl+query;
    
    return this.http.get<T>(query,  { headers });


  }

  getTopHeadlines(){
    this.headLinePage++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=ar&page=${this.headLinePage}`);
   // return this.http.get<RespuestaTopHeadlines>('http://newsapi.org/v2/top-headlines?country=ar&apiKey=37dfe50420d0401d9d01a9d222835020');
  }
  getTopHeadlinesCategoria(categoria: string){

    if(this.categoriaActual==categoria){
      this.categoriaPage++;
    }else{
      this.categoriaPage=1;
      this.categoriaActual=categoria;
    }
    // return this.http.get('https://newsapi.org/v2/top-headlines?country=ar&category=business&apiKey=37dfe50420d0401d9d01a9d222835020');
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=ar&category=${categoria}&page=${this.categoriaPage}`);
  }
}
