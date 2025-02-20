import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { PokemonService } from './services/pokemon.service';
import { TitleCasePipe } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';


@Component({
  imports: [TitleCasePipe, RouterModule, MatPaginatorModule, MatCardModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent implements OnInit {
  pokemonList: any[] = [];
  pageSize = 10;
  pageIndex = 0;
  totalPokemon = 151;
  title = 'pokedex';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadPokemon();
  }

  loadPokemon() {
    const offset = this.pageIndex * this.pageSize;
    this.pokemonService.getPokemon(this.pageSize, offset).subscribe((data) => {
      this.pokemonList = data;
    });
  }
  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPokemon();
  }
}
