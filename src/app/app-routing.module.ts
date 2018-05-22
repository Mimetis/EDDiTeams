import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigComponent } from './config/config.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './modules/auth/auth/auth.component';
import { AuthendComponent } from './modules/auth/authend/authend.component';

var routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "config", component: ConfigComponent },
  { path: "auth", component: AuthComponent },
  { path: "authend", component: AuthendComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
