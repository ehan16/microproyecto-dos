import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/models/game.model';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  saleForm: FormGroup;
  id: number;
  game: Game;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private fs: FirestoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.saleForm = new FormGroup({
      name: new FormControl('', Validators.required),
      identification: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)
    });

    this.id = this.route.snapshot.parent.params['id'];
    console.log(this.id);

    this.route.parent.params.subscribe((param: Params) => {
      this.id = param['id'];
    });

    this.gameService.getGameDetails(this.id).subscribe((data: Game) => {
      this.game = data;
      console.log(data);
    });
  }

  onSubmit() {
    const sale = {
      name: this.saleForm.value.name,
      identification: this.saleForm.value.identification,
      phone: this.saleForm.value.phone,
      address: this.saleForm.value.address,
      amount: this.saleForm.value.amount,
      videogame: this.game.name
    };
    console.log(this.saleForm);
    console.log(sale);
    this.fs.create(sale, 'sales');
    this.router.navigate(['/home']);
  }
}
