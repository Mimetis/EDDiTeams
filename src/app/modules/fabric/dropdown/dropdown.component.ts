import { Component, Input, Output, EventEmitter, ElementRef, AfterViewInit, SimpleChange } from '@angular/core';
import { FabricModule } from '../fabric.module';


interface DropDownItem {
  key: string;
  value: string;
  isSelected: boolean;
  isDisabled: boolean;
}


const DROPDOWN_CLASS = "ms-Dropdown";
const DROPDOWN_TITLE_CLASS = "ms-Dropdown-title";
const DROPDOWN_LABEL_HELPER = "ms-Dropdown-truncator";
const DROPDOWN_ITEMS_CLASS = "ms-Dropdown-items";
const DROPDOWN_ITEM_CLASS = "ms-Dropdown-item";
const DROPDOWN_SELECT_CLASS_SELECTOR = ".ms-Dropdown-select";
const PANEL_CLASS = "ms-Panel";
const IS_OPEN_CLASS = "is-open";
const IS_DISABLED_CLASS = "is-disabled";
const IS_SELECTED_CLASS = "is-selected";
const ANIMATE_IN_CLASS = "animate-in";
const SMALL_MAX_WIDTH: number = 479;


@Component({
  selector: 'fab-dropdown',
  template: "<div class='ms-Dropdown'><i class='ms-Dropdown-caretDown ms-Icon ms-Icon--ChevronDown'></i></div>"
})
export class DropdownComponent {

  private _originalOptions: NodeListOf<HTMLOptionElement>;

  @Input() items: Array<DropDownItem>;
  @Input() isDisabled: boolean = false;
  @Output() selectedItemChanged: EventEmitter<DropDownItem> = new EventEmitter<DropDownItem>();


  private _container: HTMLElement;
  private _newDropdownLabel: HTMLSpanElement;
  private _dropdownLabelHelper: HTMLSpanElement;
  private _newUList: HTMLUListElement;
  private _panelContainer: HTMLElement;


  constructor(private element: ElementRef) {

    /** Bind the callbacks to retain their context */
    this._onCloseDropdown = this._onCloseDropdown.bind(this);
    this._onItemSelection = this._onItemSelection.bind(this);
    this._onOpenDropdown = this._onOpenDropdown.bind(this);
  }


  ngAfterViewInit() {

    // get the container
    this._container = this.element.nativeElement.children[0];

    // create a span
    this._dropdownLabelHelper = document.createElement("span");
    this._dropdownLabelHelper.classList.add(DROPDOWN_LABEL_HELPER);
    this._dropdownLabelHelper.classList.add(DROPDOWN_TITLE_CLASS);

    // create a span for the selected value title
    this._newDropdownLabel = document.createElement("span");
    this._newDropdownLabel.classList.add(DROPDOWN_TITLE_CLASS);

    // check if we are disabled
    if (this.isDisabled) {
      this._container.classList.add('is-disabled');
    }

    // create a new dropdown based on UL / LI
    this._newUList = document.createElement("ul");
    this._newUList.classList.add(DROPDOWN_ITEMS_CLASS);

    /** Add the new replacement dropdown */
    this._container.appendChild(this._newDropdownLabel);
    this._container.appendChild(this._newUList);

    /** Add dropdown label helper for truncation */
    this._container.appendChild(this._dropdownLabelHelper);

    /** Toggle open/closed state of the dropdown when clicking its title. */
    this._newDropdownLabel.addEventListener("click", this._onOpenDropdown);

    // bind values
    this.bind();

  }


  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {

    for (let propName in changes) {
      let changedProp = changes[propName];

      if (propName.toLocaleLowerCase() === "items" && !changedProp.isFirstChange()) {
        this.bind();
      } else if (propName.toLocaleLowerCase() === "isdisabled" && !changedProp.isFirstChange()) {
        if (this.isDisabled) {
          this._container.classList.add('is-disabled');
        } else {
          this._container.classList.remove('is-disabled');
        }
      }
    }
  }


  /** Call a bind on the list. will clean the list and then fill it again with the options values */
  bind() {

    if (this._newUList.children && this._newUList.children.length > 0) {
      for (let i = this._newUList.children.length - 1; i >= 0; i--) {
        this._newUList.removeChild(this._newUList.children[i]);
      }
    }

    if (!this.items || this.items.length <= 0)
      return;

    let foundOneSelected = false;

    for (let i = 0; i < this.items.length; ++i) {
      let ddlItem = this.items[i];

      // if the value is selected, set the title correctly
      if (ddlItem.isSelected) {
        this._newDropdownLabel.innerHTML = ddlItem.value;
      }

      // create a new li
      let liItem = document.createElement("li");
      liItem.classList.add(DROPDOWN_ITEM_CLASS);

      // check if we can or not select it
      if (ddlItem.isDisabled) {
        liItem.classList.add("is-disabled");
      }

      if (ddlItem.isSelected) {
        liItem.classList.add(IS_SELECTED_CLASS);
        foundOneSelected = true;
      }

      liItem.innerHTML = ddlItem.value;
      liItem.id = ddlItem.key;

      this._newUList.appendChild(liItem);

      liItem.addEventListener("click", this._onItemSelection);
    }

    // // select the first one
    // if (!foundOneSelected && this._newUList.children.length > 0) {
    //   let option = this.items[0];
    //   this._newDropdownLabel.innerHTML = option.value;
    //   this._newUList[0].classList.add(IS_SELECTED_CLASS);
    // }
  }


  private _onOpenDropdown(evt: Event) {

    let isOpen = this._container.classList.contains(IS_OPEN_CLASS);

    if (!this.isDisabled && !isOpen) {
      /** Stop the click event from propagating, which would just close the dropdown immediately. */
      evt.stopPropagation();
      this._closeOtherDropdowns();

      /** Go ahead and open that dropdown. */
      this._container.classList.add(IS_OPEN_CLASS);

      /** Temporarily bind an event to the document that will close this dropdown when clicking anywhere. */
      document.addEventListener("click", this._onCloseDropdown);

    }
  }


  private _closeOtherDropdowns() {
    let dropdowns = document.querySelectorAll(`.${DROPDOWN_CLASS}.${IS_OPEN_CLASS}`);
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove(IS_OPEN_CLASS);
    }
  }

  private _onCloseDropdown(evt: Event) {
    this._container.classList.remove(IS_OPEN_CLASS);
    document.removeEventListener("click", this._onCloseDropdown);
  }



  private _onItemSelection(evt: any) {

    let liItemSelected = <HTMLLIElement>evt.target;
    let dropDownItemSelected: DropDownItem = this.items.find(ddi => ddi.key == liItemSelected.id);


    if (!this.isDisabled && !dropDownItemSelected.isDisabled) {
      /** Deselect all items and select this one. */
      /** Update the css. */
      for (let i = 0; i < this.items.length; ++i) {

        let currentLiItem = this._newUList.children[i];

        if (currentLiItem.id === liItemSelected.id) {
          currentLiItem.classList.add(IS_SELECTED_CLASS);
          this.items[i].isSelected = true;
        } else {
          currentLiItem.classList.remove(IS_SELECTED_CLASS);
          this.items[i].isSelected = false
        }

      }

      /** Update the replacement dropdown's title. */
      this._newDropdownLabel.innerHTML = dropDownItemSelected.value;

      /** Trigger any change event tied to the original dropdown. */
      this.selectedItemChanged.emit(dropDownItemSelected);

    }
  }

}
