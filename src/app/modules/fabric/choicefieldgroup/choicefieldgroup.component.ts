import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter, Output, ViewChildren, QueryList } from '@angular/core';
import { RadiobuttonComponent } from '../radiobutton/radiobutton.component';
import { ChoiceItem } from '../choiceItem';



@Component({
  selector: 'fab-choicefieldgroup',
  template: `
  <div class="ms-ChoiceFieldGroup" id="choicefieldgroup" #_choicefieldgroup role="radiogroup">
    <div class="ms-ChoiceFieldGroup-title">
      <label class="ms-Label is-required">{{value}}</label>
    </div>
    <ul class="ms-ChoiceFieldGroup-list">
      <fab-radiobutton 
        [id]="item.id"
        [value]="item.value"
        (checkChanged)="checkChanged($event)"
        [isChecked]="item.isSelected"
        [isDisabled]="item.isDisabled"
        *ngFor="let item of items"></fab-radiobutton>
    </ul>
  </div>            
  `

})
export class ChoiceFieldGroupComponent implements OnInit {

  private _isDisabled: boolean;
  private _selectedItem: ChoiceItem;
  private _container: HTMLElement;

  public radioButtons: RadiobuttonComponent[];

  @ViewChild("_choicefieldgroup", { read: ElementRef })
  private _choicefieldgroup: ElementRef;

  // get the list of radio buttons components inside my radio button list
  @ViewChildren(RadiobuttonComponent) radioButtonsQuery: QueryList<RadiobuttonComponent>;

  constructor(private element: ElementRef) { }


  ngOnInit() {
    // get the container
    this._container = this.element.nativeElement.children[0];

  }

  ngAfterViewInit() {

    // getting the initials radiobuttons list
    this.radioButtons = this.radioButtonsQuery.toArray();

    this.radioButtonsQuery.changes.subscribe((r) => {
      this.radioButtons = r.toArray();
    });
  }


  checkChanged(radiobutton: RadiobuttonComponent) {

    if (!this.radioButtons || this.radioButtons.length <= 0)
      return;

    for (let i = 0; i < this.radioButtons.length; i++) {
      let rbc = this.radioButtons[i];
      rbc._setCheckWithourRaisingEvent(rbc === radiobutton);

      if (rbc === radiobutton) {
        // getting the right item
        // dont call selectedItem to avoid a recursive call
        this._selectedItem = this.items.find(item => item.id === rbc.id);
        // send the event
        this.selectedItemChange.emit(this._selectedItem);
      }
    }


  }

  // value label
  @Input() value: string;

  // items to bind to radio buttons list
  @Input() items: Array<ChoiceItem>;

  @Input()
  get selectedItem(): ChoiceItem {
    return this._selectedItem;
  }

  @Output() selectedItemChange: EventEmitter<ChoiceItem> = new EventEmitter<ChoiceItem>();

  set selectedItem(val: ChoiceItem) {
    this._selectedItem = val;

    // get the righ radio button
    let rb = this.radioButtons.find(r => r.id == val.id);

    if (rb == undefined)
      return;

    // will raised the event
    // then emit will be called in checkChanged() event
    rb.isChecked = true;
  }

  @Input()
  get isDisabled(): boolean {
    return this._isDisabled;
  }

  @Output() isDisabledChange = new EventEmitter<boolean>();

  set isDisabled(val) {
    this._isDisabled = val;

    if (!this.radioButtons || this.radioButtons.length <= 0)
      return;

    for (let i = 0; i < this.radioButtons.length; i++) {
      let rbc = this.radioButtons[i];
      rbc.isDisabled = val;
    }

    // raise the event
    this.isDisabledChange.emit(val);
  }

}
