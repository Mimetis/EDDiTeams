import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent {

  constructor() { }

  ngAfterViewInit() {
  }

  sample06label = 'result';

  clicked(event: any) {
    this.sample06label = 'BUTTON CLICKED';
  }

}
