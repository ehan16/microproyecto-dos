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

  }

  buy() {
    this.router.navigate(["buy"], { relativeTo: this.route });
  }

}
