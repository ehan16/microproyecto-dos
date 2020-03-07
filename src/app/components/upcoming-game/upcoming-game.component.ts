import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { GameService } from 'src/app/services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upcoming-game',
  templateUrl: './upcoming-game.component.html',
  styleUrls: ['./upcoming-game.component.css']
})
export class UpcomingGameComponent implements OnInit {

  searchText;
  games: Game[];
  page = 1;

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit() {

    const today = new Date();
    console.log(today);
    console.log(today.getDate);

    this.gameService.getUpcomingGames(today, this.page).subscribe(
      data => {
        this.games = data['results'];
        console.log(this.games);
      }
    );
  }

  seeDetails(game: Game) {
    this.router.navigate(['/game', game.id]);
    console.log(game.id);
    console.log(game.released);
  }

  seeMore(){
    const today = new Date();
    this.page = this.page + 1;
    console.log(this.page);
    this.gameService.getUpcomingGames(today, this.page).subscribe(
      data => {
        this.games.push(...data['results']);
      }
    )
  }

}
