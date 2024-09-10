import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Observable
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(
    private http: HttpClient
  ) { }

  public apiListAllPokemons(offset: number, limit: number):Observable<any>{
    const url = `${this.baseUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get<any>(url).pipe(
      tap( res => res ),
      tap( res => {
        res.results.map((resPokemons: any) => {
          this.apiGetPokemon(resPokemons.url).subscribe(
            res => resPokemons.status = res
          );
        })
      })
    )
  }

  public apiGetPokemon(url: string ):Observable<any>{
    return this.http.get<any>(url).pipe(
      map(
        res => res
      )
    )
  }

  public apiGetPokemonByName(name: string): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
    return this.http.get<any>(url).pipe(
      map(res => res),
      catchError(() => {
        return throwError(() => new Error('Pokemon no encontrado'));
      })
    );
  }
}