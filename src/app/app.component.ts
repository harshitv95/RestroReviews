import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'RestroReviews';
  constructor (private router: Router) {}
  public logout() {
    localStorage.removeItem('login_role');
    this.router.navigate(['login']);
  }
}
