import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent {

  constructor() { }

  ngAfterViewInit() {
    // @ts-ignore
    PR.prettyPrint();
  }

  sample01 = `<fab-button value="Click me !"></fab-button>`
  sample02 = `<fab-button classType="ms-Button--primary" value="Click me !"></fab-button>`
  sample03 = `<fab-button classType="ms-Button--hero" value="Click me !"></fab-button>`
  sample04 = `<fab-button classType="ms-Button--compound" value="Click me !" description="get more informations about this"></fab-button>`
  sample05 = `<fab-button (click)="clicked()" classType="ms-Button--primary" class="button-margin" value="Raise click event"></fab-button>`
  sample05label = 'result';
  sample06 = `<fab-button classType="ms-Button--primary" isDisabled="true" value="Click me !"></fab-button>`

  clicked() {
    this.sample05label = 'you clicked the button !';
  }

}
