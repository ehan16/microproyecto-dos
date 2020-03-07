import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { GameService } from 'src/app/services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchText;
  games: Game[];
  page = 1;

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit() {
    this.gameService.getGames(this.page).subscribe(
      data => {
        this.games = data['results'];
        console.log(this.games);
      }
    );
  }

  seeDetails(game: Game) {
    this.router.navigate(['/game', game.id]);
    console.log(game.id);
  }

  seeMore(){
    this.page = this.page + 1;
    console.log(this.page);
    this.gameService.getGames(this.page).subscribe(
      data => {
        this.games.push(...data['results']);
      }
    )
  }

}
