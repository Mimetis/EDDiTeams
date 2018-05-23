import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigComponent } from './config/config.component';
import { HttpClientModule } from '@angular/common/http';
import { GraphService } from './services/graph.service';
import { HomeComponent } from './home/home.component';
import { AuthModule } from './modules/auth/auth.module';
import { FabricModule } from "./modules/fabric/fabric.module";

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,

    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    FabricModule
  ],
  providers: [GraphService],
  bootstrap: [AppComponent]
})
export class AppModule { }
