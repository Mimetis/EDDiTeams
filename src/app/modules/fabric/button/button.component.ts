import { Component, OnInit, Input, ViewEncapsulation, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'fab-button',
  template: `
            <button #_buttonRef class="ms-Button">
              <span class="ms-Button-label">{{value}}</span>
              <span class="ms-Button-description">{{description}}</span> 
            </button>
  `
})
export class ButtonComponent {

  _isDisabled: any;
  @Input() value: string;

  @Input() classType: string;

  @Input() description: string;

  @ViewChild("_buttonRef", { read: ElementRef })
  private _buttonRef: ElementRef;

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    let componentElement: HTMLElement = this.element.nativeElement.children[0];

    if (this.classType && this._buttonRef) {
      this._buttonRef.nativeElement.classList.add(this.classType);
    }

  }

  @Input()
  get isDisabled(): boolean {
    return this._isDisabled;
  }

  @Output() isDisabledChange = new EventEmitter<boolean>();

  set isDisabled(val) {
    this._isDisabled = val;

    if (val && !this._buttonRef.nativeElement.classList.contains('is-disabled'))
      this._buttonRef.nativeElement.classList.add("is-disabled");
    else if (!val && this._buttonRef.nativeElement.classList.contains('is-disabled'))
      this._buttonRef.nativeElement.classList.remove("is-disabled");

    // raise the event
    this.isDisabledChange.emit(val);
  }

}
