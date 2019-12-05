import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public login(username: string, password: string) {
    let params: HttpParams =
      new HttpParams()
        .append("username", username)
        .append("password", password);
    return this.http.post(environment.apiUrl + "login", params);
  }
}
