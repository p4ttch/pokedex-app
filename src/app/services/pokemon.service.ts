import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  

  constructor(private http: HttpClient) { }

  // getPokemon(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl);
  // }

  getPokemon(limit: number = 10, offset: number = 0): Observable<any[]> {
    let apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

    return this.http.get<{ results: { name: string; url: string }[] }>(apiUrl).pipe(
      map((response) =>  
        response.results.map((pokemon) => {
          const id = pokemon.url.split('/').slice(-2,-1)[0];
          return {
            name: pokemon.name,
            id: id,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          };
        })
      )
    );
  }
}
