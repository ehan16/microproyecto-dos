import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { UpcomingGameComponent } from './components/upcoming-game/upcoming-game.component';
import { GameViewComponent } from './components/game-view/game-view.component';
import { OrderComponent } from './components/game-view/order/order.component';
import { GameDetailComponent } from './components/game-view/game-detail/game-detail.component';


const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'upcoming-games', component: UpcomingGameComponent},
  {path: 'game/:id', component: GameViewComponent, children: [
    {path: '', component: GameDetailComponent},
    {path: 'buy', component: OrderComponent}
  ]},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
