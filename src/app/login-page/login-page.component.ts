import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [LoginService]
})
export class LoginPageComponent implements OnInit {

  username: string = "";
  password: string = "";
  loading = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  public login() {
    this.loading = true;
    this.loginService.login(this.username, this.password)
      .subscribe((resp: any) => {
        this.loading = false;
        if (resp.status === "failed")
          alert("Invalid Credentials");
        else {
          localStorage.setItem("login_user", this.username);
          localStorage.setItem("login_name", resp.fullName);
          localStorage.setItem("login_role", resp.role);
          this.router.navigate(['']);
        }
      });
  }

}
