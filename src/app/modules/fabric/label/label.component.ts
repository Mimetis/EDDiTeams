import { Component, OnInit, Input, ElementRef, SimpleChange } from '@angular/core';

@Component({
  selector: 'fab-label',
  template: '<label class="ms-Label">{{text}}</label>'
})
export class LabelComponent {


  @Input() text: string;
  @Input() isDisabled: boolean = false;
  @Input() isRequired: boolean = false;


  componentElement: HTMLElement;

  constructor(private element: ElementRef) {

  }

  ngOnInit() {

    this.componentElement = this.element.nativeElement.children[0];

    if (this.isDisabled) {
      this.componentElement.classList.add('is-disabled');
    } else {
      this.componentElement.classList.remove('is-disabled');
    }
    if (this.isRequired) {
      this.componentElement.classList.add('is-required');
    } else {
      this.componentElement.classList.remove('is-required');
    }

  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {

    if (!this.componentElement)
      return;

    console.log("on changes");

    for (let propName in changes) {
      let changedProp = changes[propName];

      if (propName === "isDisabled") {
        if (this.isDisabled) {
          this.componentElement.classList.add('is-disabled');
        } else {
          this.componentElement.classList.remove('is-disabled');
        }

      } else if (propName === "isRequired") {
        if (this.isRequired) {
          this.componentElement.classList.add('is-required');
        } else {
          this.componentElement.classList.remove('is-required');
        }
      }
    }
  }
}
