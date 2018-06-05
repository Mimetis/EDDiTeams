import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigComponent } from './config/config.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './modules/auth/auth/auth.component';
import { AuthendComponent } from './modules/auth/authend/authend.component';
import { AuthlogoutComponent } from './modules/auth/authlogout/authlogout.component';
import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioComponent } from './choices/radio.component';
import { TableComponent } from './table/table.component';
import { TextfieldComponent } from './textfield/textfield.component';
import { DialogComponent } from './dialog/dialog.component';
import { OverlayComponent } from './overlay/overlay.component';

var routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "config", component: ConfigComponent },
  { path: "auth", component: AuthComponent },
  { path: "authend", component: AuthendComponent },
  { path: "authlogout", component: AuthlogoutComponent },
  { path: "button", component: ButtonComponent },
  { path: "checkbox", component: CheckboxComponent },
  { path: "choices", component: RadioComponent },
  { path: "textfield", component: TextfieldComponent },
  { path: "table", component: TableComponent },
  { path: "overlay", component: OverlayComponent },
  { path: "dialog", component: DialogComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
