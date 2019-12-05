import { Component, OnInit } from '@angular/core';
import { LoginCheckService } from '../services/login-check.service';
import { RestaurantsService } from '../services/restaurants.service';
import { Restaurant } from '../models/restaurant.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  searchString: string = "";
  restaurants: Restaurant[] = [];

  constructor(private loginCheck: LoginCheckService, private restroService: RestaurantsService) { }

  ngOnInit() {
    this.loginCheck.do();
  }

  public search() {
    this.restroService.getRestaurants({title: this.searchString}).subscribe(resp => this.restaurants = resp);
  }

}
