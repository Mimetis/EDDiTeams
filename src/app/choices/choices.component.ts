import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html'

})
export class ChoicesComponent {

  constructor() { }

  ngAfterViewInit() {
    // @ts-ignore
    PR.prettyPrint();
  }

  items = [
    { key: "1", value: "Option 1", isDisabled: false },
    { key: "2", value: "Option 2", isDisabled: false },
    { key: "3", value: "Option 3", isDisabled: true },
    { key: "4", value: "Option 4", isDisabled: false },
  ];

  datas = ``

  sample01 = `<fab-choicefieldgroup [items]="items" value="Make a CHOICE"></fab-choicefieldgroup>`;

}
