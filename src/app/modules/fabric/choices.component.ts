import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter, Output, ViewChildren, QueryList, forwardRef, ContentChildren, Optional } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


// Increasing integer for generating unique ids for radio components.
let nextUniqueId = 0;


/** Change event object emitted by ChoiceComponent and ChoicesComponent. */
export class ChoiceChange {
  constructor(
    /** The MatRadioButton that emits the change event. */
    public source: ChoiceComponent,
    /** The value of the MatRadioButton. */
    public value: any) { }
}


/**
 * Provider Expression that allows mat-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
export const MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ChoiceComponent),
  multi: true
};



@Component({
  selector: 'fab-choices',
  template: `
  <div class="ms-ChoiceFieldGroup" id="{{id}}" role="radiogroup">
    <div class="ms-ChoiceFieldGroup-title">
      <label class="ms-Label" #_labelField >{{label}}</label>
    </div>
    <div class="ms-ChoiceFieldGroup-list">
      <ng-content></ng-content>
    </div>  
  </div>            
  `,

})
export class ChoicesComponent implements OnInit {

  private _isDisabled: boolean;
  private _selectedItem: any;
  private _container: HTMLElement;

  public _radioButtons: ChoiceComponent[];

  /**  ge the content children */
  @ContentChildren(forwardRef(() => ChoiceComponent), { descendants: true })
  radioButtonsQuery: QueryList<ChoiceComponent>;

  /** Gets the label from DOM */
  @ViewChild("_labelField")
  private _labelField: ElementRef;

  //#region   isRequired

  private _isRequired: boolean = false;
  /** Gets or Sets if making a choice is mandatory */
  @Input()
  get isRequired(): boolean {
    return this._isRequired;
  }

  set isRequired(val) {

    if (!this._labelField && !this._labelField.nativeElement)
      return;

    this._isRequired = val;

    if (this._isRequired && !this._labelField.nativeElement.classList.contains("is-required")) {
      this._labelField.nativeElement.classList.add("is-required");
    } else if (!this._isRequired && this._labelField.nativeElement.classList.contains("is-required")) {
      this._labelField.nativeElement.classList.remove("is-required");
    }
  }
  //#endregion

  constructor(private element: ElementRef) { }

  /** Get or Sets the label for choices title */
  @Input() label: string;

  /** Get or Sets the choices control id */
  @Input() id: string;


  ngOnInit() {
    // get the container
    this._container = this.element.nativeElement.children[0];

  }

  /** After rendered, get all the radio buttons in the content */
  ngAfterViewInit() {

    // getting the initials radiobuttons list
    this._radioButtons = this.radioButtonsQuery.toArray();

    this.radioButtonsQuery.changes.subscribe((r) => {
      this._radioButtons = r.toArray();
    });
  }

  /** The HTML name attribute applied to radio buttons in this group. */
  private _name: string = `choices-${nextUniqueId++}`;

  /** Name of the radio button group. All radio buttons inside this group will use this name. */
  @Input()
  get name(): string { return this._name; }
  set name(value: string) {
    this._name = value;
    this._updateRadioButtonNames();
  }

  private _updateRadioButtonNames(): void {
    if (this._radioButtons) {
      this._radioButtons.forEach(radio => {
        radio.name = this.name;
      });
    }
  }

  /**
   * Event emitted when the group value changes.
   * Change events are only emitted when the value changes due to user interaction with
   * a radio button (the same behavior as `<input type-"radio">`).
   */
  @Output() readonly change: EventEmitter<ChoiceChange> = new EventEmitter<ChoiceChange>();

  @Input()
  get selectedItem(): ChoiceComponent {
    return this._selectedItem;
  }

  @Output() selectedItemChange: EventEmitter<ChoiceComponent> = new EventEmitter<ChoiceComponent>();

  set selectedItem(val: ChoiceComponent) {

    // get the right choice component
    let rb = this._radioButtons.find(r => r === val);

    // if already checked, no need to raise a new event
    if (rb == undefined || rb === this._selectedItem)
      return;

    this._selectedItem = val;

    // check and uncheck choice component inside the choices component
    for (let i = 0; i < this._radioButtons.length; i++) {
      let rbc = this._radioButtons[i];

      rbc._setCheckWithourRaisingEvent(rbc === this._selectedItem);
    }

    console.log(this._selectedItem);
    this.change.emit(this._selectedItem);
  }

  //#region  isDisabled

  @Input()
  get isDisabled(): boolean {
    return this._isDisabled;
  }

  @Output() isDisabledChange = new EventEmitter<boolean>();

  set isDisabled(val) {
    this._isDisabled = val;

    if (!this._radioButtons || this._radioButtons.length <= 0)
      return;

    for (let i = 0; i < this._radioButtons.length; i++) {
      let rbc = this._radioButtons[i];
      rbc.isDisabled = val;
    }

    // raise the event
    this.isDisabledChange.emit(val);
  }

  //#endregion
}


@Component({
  selector: 'fab-choice',
  template: `
          <div class="ms-RadioButton">
          <input  tabindex="-1" #_choiceInput  type="radio" 
                  [id]="id" 
                  [name]="name" 
                  class="ms-RadioButton-input">
          <label role="radio" #_choiceField class="ms-RadioButton-field" tabindex="0" aria-checked="false" name="choicefieldgroup">
            <div class="ms-Label">
              <ng-content></ng-content>
            </div>
          </label>
          </div>`
})
/**
 * RadioButton has 4 main properties
 * id : component id
 * value : component text value
 * isChecked : set if the component is checked or not
 * isDisabled : set if the component is disabled.
 */
export class ChoiceComponent implements OnInit, ControlValueAccessor {

  writeValue(obj: any): void {
    this.isChecked = (obj === true);
  }
  registerOnChange(fn: any): void {
    throw new Error("Method not implemented.");
  }
  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }


  private _isDisabled: boolean;
  private _isChecked: boolean;
  private _container: HTMLElement;

  @ViewChild("_choiceField", { read: ElementRef })
  private _choiceFieldRef: ElementRef;

  @ViewChild("_choiceInput", { read: ElementRef })
  private _choiceInputRef: ElementRef;

  /** The unique ID for the radio button. */
  @Input()
  public id: string;

  /** Name of the radio button group. All radio buttons inside this group will use this name. */
  @Input()
  public name: string;

  /** The value of the choice item. Often binded to an inner object. */
  @Input()
  public value: any;

  /** Gets or sets if the choice radio input is checked or not. should be a boolean */
  @Input()
  get isChecked(): boolean {
    return this._isChecked;
  }

  @Output() isCheckedChange = new EventEmitter<boolean>();

  set isChecked(val) {

    // set correct css classes
    if (this._choiceFieldRef && this._choiceFieldRef.nativeElement) {

      this._setCheckWithourRaisingEvent(val);

      // raise event
      this.isCheckedChange.emit(this._isChecked);

      // get the group and call the selectedItem
      if (this.choicesGroup) {
        this.choicesGroup.selectedItem = this;
      }

    }
  }

  _setCheckWithourRaisingEvent(val: boolean) {
    // set internal value
    this._isChecked = val;

    if (this._isChecked) {
      this._choiceFieldRef.nativeElement.setAttribute("aria-checked", "true");
      this._choiceFieldRef.nativeElement.classList.add("is-checked");
    } else {
      this._choiceFieldRef.nativeElement.setAttribute("aria-checked", "false");
      this._choiceFieldRef.nativeElement.classList.remove("is-checked");
    }

    // click the inner input control
    this._choiceInputRef.nativeElement.click();
  }

  constructor(@Optional() private choicesGroup: ChoicesComponent, private element: ElementRef) { }


  ngOnInit() {
    // get the container
    this._container = this.element.nativeElement.children[0];
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
      // we won't allow to "uncheck" a radio button. use a checkbox instead
      this.isChecked = true;
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


  //#region   isDisabled

  @Input()
  get isDisabled(): boolean {
    return this._isDisabled;
  }

  @Output() isDisabledChange = new EventEmitter<boolean>();

  set isDisabled(val: boolean) {
    this._isDisabled = val;

    if (val === true && !this._choiceFieldRef.nativeElement.classList.contains('is-disabled'))
      this._choiceFieldRef.nativeElement.classList.add("is-disabled");
    else if (val === false && this._choiceFieldRef.nativeElement.classList.contains('is-disabled'))
      this._choiceFieldRef.nativeElement.classList.remove("is-disabled");

    // raise the event
    this.isDisabledChange.emit(val);
  }

  //#endregion

}
