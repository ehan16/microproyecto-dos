import { Component, OnInit } from "@angular/core";
import { Game } from "src/app/models/game.model";
import { GameService } from "src/app/services/game.service";
import { ActivatedRoute, Router, Params } from "@angular/router";

@Component({
  selector: "app-game-detail",
  templateUrl: "./game-detail.component.html",
  styleUrls: ["./game-detail.component.css"]
})
export class GameDetailComponent implements OnInit {
  game: Game;
  id: number;
  trailer: any;
  screenshots: any;
  released = true;
  text: string;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    console.log(this.id);

    this.route.params.subscribe((param: Params) => {
      this.id = param["id"];
    });

    this.gameService.getTrailers(this.id).subscribe(data => {
      this.trailer = data["results"];
      console.log(this.trailer, "Hola");
    });

    this.gameService.getScreenshoys(this.id).subscribe(data => {
      this.screenshots = data["results"];
      console.log(this.screenshots, "Hola");
    });

    this.gameService.getGameDetails(this.id).subscribe((data: Game) => {
      this.game = data;
      console.log(data);
    });


    const day1 = new Date(this.game.released);
    const day2 = new Date('2020-03-06');

    const gameDate = day1.toDateString();
    const todayDate = day2.toDateString();

    if (this.compareDates('2020-03-06', day1)) {
      this.released = false;
    } else {
      this.released = true;
    }
  }

  buy() {
    this.router.navigate(["buy"], { relativeTo: this.route });
  }

  compareDates(da1, da2) {
    let parts = da1.split("-");
    let d1 = Number(parts[2] + parts[1] + parts[0]);
    parts = da2.split("-");
    let d2 = Number(parts[2] + parts[1] + parts[0]);
    return d1 <= d2;
  }
}
