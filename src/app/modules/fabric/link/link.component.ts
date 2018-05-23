import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'fab-link',
  template: '<a class="ms-Link" href="{{href}}" title="{{title}}">{{text}}</a>'
})
export class LinkComponent {


  @Input() title: string;
  @Input() text: string;
  @Input() href: string;

  constructor(private element: ElementRef) { }

  // After the control has fully rendered, create a Fabric control object for it.
  ngAfterViewInit() {
    let componentElement: HTMLElement = this.element.nativeElement.children[0];

  }
}
