import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { AuthendComponent } from './authend/authend.component';
import { AuthService } from './auth.service';
import { UtilsService } from './utils.service';
import { AuthlogoutComponent } from './authlogout/authlogout.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AuthComponent,
    AuthendComponent,
    AuthlogoutComponent
  ],
  exports: [
    AuthComponent,
    AuthendComponent
  ],
  providers: [
    AuthService,
    UtilsService
  ]
})
export class AuthModule { }
