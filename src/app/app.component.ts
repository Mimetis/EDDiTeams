import { Component, ViewChild } from '@angular/core';
import { OverlayComponent as Overlay } from "./modules/fabric/overlay.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  @ViewChild('overlay')
  overlay: Overlay


  show() {
    this.overlay.show();
  }
}

