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
import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioComponent } from './choices/radio.component';
import { TableComponent } from './table/table.component';
import { TextfieldComponent } from './textfield/textfield.component';
import { DialogComponent } from './dialog/dialog.component';
import { OverlayComponent } from './overlay/overlay.component';
import { HighlightComponent } from './highlight/highlight.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
    HomeComponent,
    ButtonComponent,
    CheckboxComponent,
    RadioComponent,
    TableComponent,
    TextfieldComponent,
    DialogComponent,
    OverlayComponent,
    HighlightComponent
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
