import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GameService {

  baseUrl: string = 'https://api.rawg.io/api/games';
  pageSize: string = 'https://api.rawg.io/api/games?page_size=20&page=';

  constructor(private http: HttpClient) {
  }

  getGameDetails(id) {
    let endpoint = `${this.baseUrl}/${id}`;
    console.log(id);
    return this.http.get(endpoint);
  }

  getGames(size) {
    let endpoint = `${this.pageSize}${size}`;
    return this.http.get(endpoint);
  }

  getTrailers(id) {
    let endpoint = `${this.baseUrl}/${id}/movies`;
    console.log(endpoint);
    return this.http.get(endpoint);
  }

  getScreenshoys(id){
    let endpoint = `${this.baseUrl}/${id}/screenshots`;
    return this.http.get(endpoint);
  }

  getUpcomingGames(date: Date, size) {
    const day = date.getDate() - 1;
    const month = date.getMonth();
    const year = date.getFullYear();
    const today = year + '-' + month + '-' + day;
    console.log(today);
    let endpoint = `https://api.rawg.io/api/games?dates=2020-03-06,2022-01-01&ordering=-added`;
    // let endpoint = `https://api.rawg.io/api/games?dates=${today},2022-01-01&ordering=-added`;
    // let endpoint = `${this.baseUrl}?dates=1000-01-01,${today}&page_size=${size}`;
    return this.http.get(endpoint);
  }

}
