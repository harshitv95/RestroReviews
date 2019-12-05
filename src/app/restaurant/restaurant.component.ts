import { Component, OnInit } from "@angular/core";
import { LoginCheckService } from "../services/login-check.service";
import { Restaurant } from "../models/restaurant.model";
import { RestaurantsService } from "../services/restaurants.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-restaurant",
  templateUrl: "./restaurant.component.html",
  styleUrls: ["./restaurant.component.scss"]
})
export class RestaurantComponent implements OnInit {
  restaurant: Restaurant;
  menu: any = {};
  classifications: any = {};
  Objectkeys = Object.keys;
  reviews: any[];
  userReview: string = "";

  constructor(
    private loginCheck: LoginCheckService,
    private restroService: RestaurantsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loginCheck.do();

    this.restroService
      .getRestaurant(this.route.snapshot.paramMap.get("uuid"))
      .subscribe(resp => (this.restaurant = resp));

    this.restroService
      .getMenu(this.route.snapshot.paramMap.get("uuid"))
      .subscribe(resp => {
        if (!resp) return;
        this.menu = resp.menu || {};
        this.classifications = resp.classifications || {};
      });

    this.restroService
      .getReviews(this.route.snapshot.paramMap.get("uuid"))
      .subscribe(resp => {
        this.reviews = resp;
      });
  }

  public getFromStorage(key) {
    return localStorage.getItem(key);
  }

  public submitReview() {
    console.log("Posting review");
    this.restroService
      .postReview(this.route.snapshot.paramMap.get("uuid"), {
        review: this.userReview,
        reviewer: localStorage.getItem("login_user"),
        reviewerName: localStorage.getItem("login_name")
      })
      .subscribe(res => {
        this.restroService
          .getReviews(this.route.snapshot.paramMap.get("uuid"))
          .subscribe(resp => {
            this.reviews = resp;
            this.userReview = "";
          });
      });
  }

  public editReview(index: number, fullName, username) {
    let newReview = prompt("Edit review by " + fullName);
    if (!!newReview) {
      this.restroService
        .editReview(this.route.snapshot.paramMap.get("uuid"), index, {
          reviewerName: fullName,
          reviewer: username,
          review: newReview
        })
        .subscribe(res => {
          this.restroService
            .getReviews(this.route.snapshot.paramMap.get("uuid"))
            .subscribe(resp => {
              this.reviews = resp;
            });
        });
    }
  }

  public deleteReview(index: number, fullName) {
    let conf = confirm("Are you sure you want to delete the review by " + fullName + '?');
    if (!conf) return;
    this.restroService
      .deleteReview(this.route.snapshot.paramMap.get("uuid"), index)
      .subscribe(res => {
        this.restroService
          .getReviews(this.route.snapshot.paramMap.get("uuid"))
          .subscribe(resp => {
            this.reviews = resp;
          });
      });
  }
}
