import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigComponent } from './config/config.component';
import { AppComponent } from './app.component';

var routes: Routes = [
  { path: "", component: AppComponent },
  { path: "config", component: ConfigComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
