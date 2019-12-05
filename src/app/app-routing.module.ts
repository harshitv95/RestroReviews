import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';


const routes: Routes = [
  {path:"restaurant/:uuid", component: RestaurantComponent},
  {path:"", component: HomePageComponent},
  {path: "login", component: LoginPageComponent},
  {path: "**", redirectTo:"/"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
