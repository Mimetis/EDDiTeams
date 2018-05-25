import { Component, OnInit, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'fab-checkbox',
  template: `<div class='ms-CheckBox'>
              <input tabindex='-1' #_choiceInput type='checkbox' class='ms-CheckBox-input'>
              <label role='checkbox' #_choiceField class='ms-CheckBox-field' tabindex='0' aria-checked='false' name='checkboxa'>
                <span class='ms-Label'>{{value}}</span> 
              </label>
            </div>`
})
export class CheckboxComponent {

  private _isDisabled: boolean;
  private _isChecked: boolean;

  private _container: HTMLElement;

  @ViewChild("_choiceField", { read: ElementRef })
  private _choiceFieldRef: ElementRef;

  @ViewChild("_choiceInput", { read: ElementRef })
  private _choiceInputRef: ElementRef;

  @Input()
  public value: string;

  constructor(private element: ElementRef) { }


  ngOnInit() {
    // get the container
    this._container = this.element.nativeElement.children[0];
    this._bind();
    this._addListeners();
  }


  private _addListeners(): void {

    this._choiceFieldRef.nativeElement.addEventListener("focus", this._focus.bind(this), false);
    this._choiceFieldRef.nativeElement.addEventListener("blur", this._blur.bind(this), false);
    this._choiceFieldRef.nativeElement.addEventListener("click", this._click.bind(this), false);
    this._choiceFieldRef.nativeElement.addEventListener("keydown", this._keydown.bind(this), false);

  }


  public removeListeners(): void {

    this._choiceFieldRef.nativeElement.removeEventListener("focus", this._focus.bind(this));
    this._choiceFieldRef.nativeElement.removeEventListener("blur", this._blur.bind(this));
    this._choiceFieldRef.nativeElement.removeEventListener("click", this._click.bind(this));
    this._choiceFieldRef.nativeElement.removeEventListener("keydown", this._keydown.bind(this));
  }

  _bind() {

    if (!this._choiceInputRef.nativeElement)
      return;

    if (this.isChecked) {
      this._choiceFieldRef.nativeElement.setAttribute("aria-checked", "true");
      this._choiceFieldRef.nativeElement.classList.add("is-checked");
    } else {
      this._choiceFieldRef.nativeElement.setAttribute("aria-checked", "false");
      this._choiceFieldRef.nativeElement.classList.remove("is-checked");
    }

  }


  private _focus(): void {
    this._choiceFieldRef.nativeElement.classList.add("in-focus");
  }

  private _blur(): void {
    this._choiceFieldRef.nativeElement.classList.remove("in-focus");
  }

  private _click(event: MouseEvent): void {

    event.stopPropagation();
    event.preventDefault();

    if (!this.isDisabled) {
      this.isChecked = !this.isChecked;
    }
  }



  private _keydown(event: KeyboardEvent): void {

    if (event.keyCode === 32) {
      event.stopPropagation();
      event.preventDefault();

      if (!this.isDisabled) {
        this.isChecked = !this.isChecked;
      }

    }

  }

  @Input()
  get isDisabled(): boolean {
    return this._isDisabled;
  }

  @Output() isDisabledChange = new EventEmitter<boolean>();

  set isDisabled(val) {
    this._isDisabled = val;

    if (val && !this._choiceFieldRef.nativeElement.classList.contains('is-disabled'))
      this._choiceFieldRef.nativeElement.classList.add("is-disabled");
    else if (!val && this._choiceFieldRef.nativeElement.classList.contains('is-disabled'))
      this._choiceFieldRef.nativeElement.classList.remove("is-disabled");

    // raise the event
    this.isDisabledChange.emit(val);
  }


  @Input()
  get isChecked(): boolean {
    return this._isChecked;
  }

  @Output() isCheckedChange = new EventEmitter();

  set isChecked(val) {
    this._isChecked = val;
    this._bind();
    this._choiceInputRef.nativeElement.click();
    this.isCheckedChange.emit(this._isChecked);
  }




}
