import { Component, OnInit, Input, ViewEncapsulation, ElementRef } from '@angular/core';


@Component({
  selector: 'fab-button',
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './button.component.html'
})
export class ButtonComponent {

  // Text for the button label is provided by the parent view.
  @Input() buttonlabel: string;

  @Input() class: string;

  constructor(private element: ElementRef) { }

  // After the control has fully rendered, create a Fabric control object for it.
  ngAfterViewInit() {
    let componentElement: HTMLElement = this.element.nativeElement.children[0];

    // removing from the native item, all the ms- class list, since we already have it in the button inner element.
    let arrayList: DOMTokenList = this.element.nativeElement.classList;

    if (arrayList && arrayList.length > 0) {
      for (let i = arrayList.length - 1; i >= 0; i--) {
        if (arrayList[i].toLowerCase().startsWith('ms-'))
          arrayList.remove(arrayList[i]);
      }

    }

    // @ts-ignore
    this.fabricComponent = new fabric.Button(componentElement);
  }

}
