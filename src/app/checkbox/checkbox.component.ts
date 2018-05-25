import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html'
})
export class CheckboxComponent {

  constructor() { }

  sample01 = `<fab-checkbox value="Check me !" [(isChecked)]="isChecked"></fab-checkbox>`
  sample02 = `<fab-checkbox value="Check me !" (isCheckedChange)="getChecked()"></fab-checkbox>`
  sample03 = `<fab-checkbox value="Check me !" isDisabled="true"></fab-checkbox>`

  ngAfterViewInit() {
    // @ts-ignore
    PR.prettyPrint();
  }

  getChecked() {
    this.isCheckedSample02 = "get checked from event !"
  }

  isChecked = true;
  isCheckedSample02 = "";
}
