import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.getMovies();
      this.getFavoriteMovies();
    } else {
      this.router.navigate(['welcome']);
    }
  }

  /**
   * fetch movies from FetchApiDataService service getAllMovies()
   * @returns an array of all movies
   * @function getMovies
   */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response.data;
      return this.movies;
    });
  }

  /**
   * fetch favorite movies from FetchApiDataService service getUser()
   * @returns an empty array or an array of movies favorited by the user
   * @function getFavorites
   */

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((response: any) => {
      this.favoriteMovies = response.favoriteMovies;
      console.log(this.favoriteMovies);
    });
  }

  addToFavorite(movieId: string): void {
    console.log(movieId);
    this.fetchApiData.addFavoriteMovie(movieId).subscribe((response) => {
      this.snackBar.open('Movie has been added to your favorites.', 'OK', {
        duration: 8000,
      });
      this.ngOnInit();
    });
  }

  removeFromFavorite(movieId: string): void {
    console.log(movieId);
    this.fetchApiData.removeFavoriteMovie(movieId).subscribe((response) => {
      this.snackBar.open('Movie has been removed from your favorites.', 'OK', {
        duration: 8000,
      });
      this.ngOnInit();
    });
  }

  isMovieFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  toggleFavorite(movieId: string): void {
    if (this.isMovieFavorite(movieId)) {
      this.removeFromFavorite(movieId);
    } else {
      this.addToFavorite(movieId);
    }
  }

  /**
   * opens the MovieGenreComponent dialog
   * @param name
   * @param description
   * @function openGenreDialog
   */

  openGenreDialog(movie: any): void {
    const { name, description } = movie.genre;
    this.dialog.open(GenreComponent, {
      data: { name, description },
      panelClass: 'genre-dialog-background',
      width: '400px',
    });
  }

  /**
   * opens the MovieDirectorComponent dialog
   * @param name
   * @param bio
   * @param birth
   * @function openDirectorDialog
   */

  openDirectorDialog(movie: any): void {
    const { name, birth, bio } = movie.director;
    this.dialog.open(DirectorComponent, {
      data: { name, birth, bio },
      panelClass: 'director-dialog-background',
      width: '400px',
    });
  }

  /**
   * opens the MovieSummaryComponent dialog
   * @param title
   * @param description
   * @function openSummaryDialog
   */

  openSummaryDialog(movie: any): void {
    const { title, description } = movie;
    this.dialog.open(MovieDetailsComponent, {
      data: { title, description },
      panelClass: 'synopsis-dialog-background',
      width: '400px',
    });
  }
}
