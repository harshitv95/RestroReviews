import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Restaurant } from "../models/restaurant.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RestaurantsService {
  constructor(private http: HttpClient) {}

  public getRestaurants(params): Observable<Restaurant[] | any> {
    let paramStr = "";
    for (let key in params) {
      paramStr += key + "=" + params[key] + "&";
    }
    return this.http.get(environment.apiUrl + "restaurants?" + paramStr).pipe(
      map((resp: any[]) =>
        resp.map(restro => {
          return {
            title: restro.title,
            uuid: restro.uuid,
            feedback: restro.feedback
          };
        })
      )
    );
  }

  public getRestaurant(uuid: string): Observable<Restaurant> {
    return this.http
      .get(environment.apiUrl + "restaurant?uuid=" + uuid)
      .pipe(map((resp: any) => resp as Restaurant));
  }

  public getMenu(uuid: string): Observable<any> {
    return this.http.get(environment.apiUrl + "menu?uuid=" + uuid);
  }

  public getReviews(uuid: string): Observable<any> {
    return this.http.get(environment.apiUrl + "reviews?uuid=" + uuid);
  }

  public postReview(restroUuid: string, review: any) {
    let httpParams = new HttpParams()
      .append("uuid", restroUuid)
      .append("review", JSON.stringify(review));
    return this.http.post(environment.apiUrl + "postReview", httpParams);
  }

  public editReview(restroUuid: string, reviewIdx: number, review: any) {
    let httpParams = new HttpParams()
      .append("uuid", restroUuid)
      .append("index", reviewIdx+'')
      .append("review", JSON.stringify(review));
    return this.http.post(environment.apiUrl + "editReview", httpParams);
  }

  public deleteReview(restroUuid: string, reviewIdx: number) {
    let httpParams = new HttpParams()
      .append("uuid", restroUuid)
      .append("index", reviewIdx+'')
    return this.http.post(environment.apiUrl + "deleteReview", httpParams);
  }
}
