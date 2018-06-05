import { Component, OnInit, Input, ViewEncapsulation, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { mixinRequired, mixinDisabled, mixin, coerceBoolean } from './utils';

// creating a mixin with isRequired and isDisabled
const IsDisabled = mixinDisabled(mixin());

type ButtonType = 'primary' | 'hero' | 'compound' | 'noLabel';


// ms-Button--small noLabel

@Component({
  selector: 'fab-button',
  template: `
              <button #_buttonRef class="ms-Button" (click)='_onClick($event)' >
                <span class="ms-Button-label"><ng-content></ng-content></span>
                <span class="ms-Button-description">{{description}}</span> 
              </button>`,
  inputs: ['isDisabled'],
  outputs: ['isDisabledChanged']

})
export class ButtonComponent extends IsDisabled {

  @ViewChild("_buttonRef", { read: ElementRef })
  private _buttonRef: ElementRef;

  /** Gets or Sets the button type. Could be either blank, 'primary', 'hero', 'compound'  */
  @Input() buttonType: ButtonType;
  @Input() description: string;


  _small: boolean;

  /** Gets ot Sets if the button should be smaller */
  @Input()
  get small(): boolean {
    return this._small;
  }
  set small(value: boolean) {
    this._small = coerceBoolean(value);
    console.log(this._small);
  }


  constructor(private element: ElementRef) {
    super()
  }

  ngOnInit() {

    // disable the inner button, to be sure if css is disabled, button is still disabled
    this.isDisabledChanged.subscribe(isDisabled => {
      if (this.isDisabled)
        this._buttonRef.nativeElement.setAttribute('disabled', 'true');
      else
        this._buttonRef.nativeElement.removeAttribute('disabled');

    });
  }

  ngAfterViewInit() {

    if (this._buttonRef && this.buttonType)
      this._buttonRef.nativeElement.classList.add(`ms-Button--${this.buttonType}`);

    if (this._buttonRef)
      this._initIsDisable(this._buttonRef.nativeElement.classList);

    if (this.small)
      this._buttonRef.nativeElement.classList.add(`ms-Button--small`);
  }

  _onClick(event: Event) {
    // stop progagation
    if (this.isDisabled) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
  }

}
