import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  private setAllPokemons: any[] = [];
  public getAllPokemons: any[] = []
  public apiError: boolean = false;

  // Paginación
  public currentPage: number = 1;   // Página actual
  public limit: number = 10;        // Límite de resultados por página
  public totalPages: number = 0;        // Total de páginas (puedes obtener esta información desde la API)
  public offset: number = 0;

  constructor(
    private pokeApiService: PokeApiService
  ) { }

  ngOnInit(): void {
    this.fetchPokemons();
  }

   // Método para obtener Pokémon basado en la paginación
  fetchPokemons(): void {
    this.pokeApiService.apiListAllPokemons(this.offset, this.limit).subscribe(
      res => {
        if (Array.isArray(res.results)) {
          this.setAllPokemons = res.results;  // Asegúrate de que sea un array
          this.getAllPokemons = this.setAllPokemons;
        } else {
          console.error('Error: La respuesta no contiene un array en la propiedad results');
          this.apiError = true;
        }
      },
      error => {
        this.apiError = true;  // Manejo de errores
      }
    );
  }

   // Cambiar a la página siguiente
   public nextPage(): void {
    if (this.getAllPokemons.length === this.limit) {
      this.offset += this.limit;
      this.currentPage++;
      this.fetchPokemons();
    }
  }

  // Cambiar a la página anterior
  public previousPage(): void {
    if (this.offset > 0) {
      this.offset -= this.limit;
      this.currentPage--;
      this.fetchPokemons();
    }
  }

  // Volver a la primera página
  public goToFirstPage(): void {
    this.offset = 0;
    this.currentPage = 1;
    this.fetchPokemons();
  }

  public getSearch(value: string): void {
    const searchTerm = value.toLowerCase();
    console.log('Buscando:', searchTerm);  // Verificar el valor buscado
    // Filtrar localmente por nombre de Pokémon
    const filter = this.setAllPokemons.filter((pokemon: any) => {
      return pokemon.name.toLowerCase().includes(searchTerm);
    });

    // Si no se encuentra ningún Pokémon, mostrar la imagen de error
    if (filter.length === 0) {
      this.pokeApiService.apiGetPokemonByName(searchTerm).subscribe(
        res => {
          this.apiError = false;
          this.getAllPokemons = [res]; // Mostrar el Pokémon encontrado
          console.log('Pokémon encontrado:', res);  // Verificar los resultados
        },
        error => {
          this.apiError = true; // Mostrar error si no se encuentra el Pokémon
          console.error('Error en la búsqueda del Pokémon:', error);
        }
      );
    } else {
      this.apiError = false;
      this.getAllPokemons = filter;
      console.log('Pokémon encontrado en la lista actual:', filter);
    }
  }
}