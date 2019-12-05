import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginCheckService {

  constructor(private router: Router) { }

  public do() {
    if (!localStorage.getItem("login_role")) {
      this.router.navigate(["login"]);
    }
  }

}
