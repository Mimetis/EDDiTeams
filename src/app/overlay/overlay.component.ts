import { Component, OnInit, ViewChild } from '@angular/core';
import { OverlayComponent as Overlay } from "../modules/fabric/overlay.component";

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html'
})
export class OverlayComponent implements OnInit {

  ngAfterViewInit() {
    // @ts-ignore
    PR.prettyPrint();
  }

  @ViewChild('overlay')
  overlay: Overlay

  @ViewChild('overlay2')
  overlay2: Overlay

  constructor() { }

  ngOnInit() {
  }

  sample01 = `<fab-overlay #overlay (click)='overlay.hide()'></fab-overlay>`
  sample02 = `<fab-overlay #overlay2 dark (click)='overlay2.hide()'></fab-overlay>`


}
