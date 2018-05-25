import { Component, Input, Output, EventEmitter, ElementRef, AfterViewInit, SimpleChange } from '@angular/core';
import { FabricModule } from '../fabric.module';

const TABLE_ITEM_IS_SELECTED_CLASS = "is-selected";


@Component({
  selector: 'fab-table',
  template: "<table class='ms-Table ms-Table--selectable'></table>"
})
export class TableComponent {

  private _header: HTMLTableSectionElement;
  private _body: HTMLTableSectionElement;

  // items in the table
  @Input() items: Array<any>;


  // optional headers, replacing the item properties name as column header
  @Input() headers: Array<string>;

  // set if the table should allow selection
  @Input() isSelectable: boolean = false;

  // set if we can select multiple lines. It's not used if isSelectable is false
  @Input() isMultiSelection: boolean = true;


  // selected items, implementing two way binding
  @Input() selectedItems: Array<any> = [];
  // raised when an item is selected
  @Output() selectedItemsChange: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();

  private _innerTable: HTMLTableElement;

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    // get the container
    this._innerTable = this.element.nativeElement.children[0];

    if (this.isSelectable) {
      this._innerTable.addEventListener("click", this._toggleRowSelection.bind(this), false);
    }

    this._bind();
  }

  /** Call a bind on the list. will clean the list and then fill it again with the options values */
  private _bind() {

    this._body = this._innerTable.createTBody();


    // Contains headers string
    let itemProperties: Array<string> = [];

    if (this.items) {

      // get the item's properties
      if (this.items.length > 0)
        itemProperties = Object.getOwnPropertyNames(this.items[0]);

      for (let i = 0; i < this.items.length; i++) {

        // Insert a row in the table within the correct index
        var newRow = this._body.insertRow(i);

        // get the item
        var item = this.items[i];

        // for each property, set a new cell with the correct value
        for (let propIndex = 0; propIndex < itemProperties.length; propIndex++) {

          // get the property name
          let itemPropertyName = itemProperties[propIndex];

          // get the item property value
          let itemPropertyValue = item[itemPropertyName].toString();

          console.log(itemPropertyName + " - " + itemPropertyValue);
          // create a new cell
          var newCell = newRow.insertCell(propIndex);

          // create and append a new text node
          var newText = document.createTextNode(itemPropertyValue);
          newCell.appendChild(newText);

        }

        // set the selected state if the row is selected by default
        if (this.selectedItems && this.selectedItems.length > 0 && this.selectedItems.includes(item) && this.isSelectable) {
          newRow.className = TABLE_ITEM_IS_SELECTED_CLASS;
        }

        // if it's selectable, so add the checkbox on the left side
        if (this.isSelectable) {
          var newCell = newRow.insertCell(0);
          newCell.classList.add('ms-Table-rowCheck');
        }
      }

    }

    // Create an empty <thead> element and add it to the table:
    this._header = this._innerTable.createTHead();

    // create the row
    var headerRow = document.createElement('tr');
    this._header.appendChild(headerRow);

    if (this.isSelectable) {
      var headerCell = document.createElement('th');

      // add the checkbox if multi select is available
      if (this.isMultiSelection)
        headerCell.classList.add('ms-Table-rowCheck');
      else
        headerCell.classList.remove('ms-Table-rowCheck');

      headerRow.appendChild(headerCell);
    }

    // get the column headers. could be the item's property or the headers specified by the user
    let columHeaders = this.headers && this.headers.length > 0 ? this.headers : itemProperties;

    // for each property, create a header column
    for (let propIndex = 0; propIndex < columHeaders.length; propIndex++) {

      // get the property name
      let itemPropertyName = columHeaders[propIndex];

      // create the cell
      var headerCell = document.createElement('th');

      // create and append a new text node
      var newText = document.createTextNode(itemPropertyName);
      headerCell.appendChild(newText);

      // add it the the header row
      headerRow.appendChild(headerCell);
    }
  }



  /**
 * Select or deselect a row
 */
  private _toggleRowSelection(event: MouseEvent): void {

    // get the selected row
    let selectedRow = (<HTMLElement>event.target).parentElement;

    let isMultSelectionAndHeadersRowsIsClicked = 0;

    // we try to select the header row
    if (selectedRow.parentElement.tagName.toLowerCase() == "thead" && this.isMultiSelection) {
      // Toggle the selected state class
      if (selectedRow.className === TABLE_ITEM_IS_SELECTED_CLASS) {
        selectedRow.className = "";
        isMultSelectionAndHeadersRowsIsClicked = 1;
      } else {
        selectedRow.className = TABLE_ITEM_IS_SELECTED_CLASS;
        isMultSelectionAndHeadersRowsIsClicked = 2;
      }
    }

    // if we have ask for a multi selection, check all or uncheck all
    if (isMultSelectionAndHeadersRowsIsClicked > 0) {
      for (let i = 0; i < this._body.children.length; i++) {
        let rowElement = this._body.children[i];

        // if selected 
        if (isMultSelectionAndHeadersRowsIsClicked == 2) {
          rowElement.className = TABLE_ITEM_IS_SELECTED_CLASS;

        } else if (isMultSelectionAndHeadersRowsIsClicked == 1) {
          rowElement.className = "";
        }

      }
    }
    else if (selectedRow.tagName === "TR" && selectedRow.parentElement.tagName.toLowerCase() == "tbody") {

      if (!this.isMultiSelection) {
        for (let i = 0; i < this._body.children.length; i++) {
          let rowElement = this._body.children[i];

          // Toggle the selected state class
          if (selectedRow.innerHTML === rowElement.innerHTML && rowElement.className === "") {
            rowElement.className = TABLE_ITEM_IS_SELECTED_CLASS;
          } else {
            rowElement.className = "";
          }

        }
      } else {
        // Toggle the selected state class
        if (selectedRow.className === TABLE_ITEM_IS_SELECTED_CLASS) {
          selectedRow.className = "";
        } else {
          selectedRow.className = TABLE_ITEM_IS_SELECTED_CLASS;
        }
      }
    }

    this._selectedItemsChanged();

  }

  _selectedItemsChanged() {

    this.selectedItems = [];

    for (let i = 0; i < this._body.children.length; i++) {
      let rowElement = this._body.children[i];

      if (rowElement.className === TABLE_ITEM_IS_SELECTED_CLASS) {

        // add the item to the selectedItems
        if (!this.selectedItems.includes(this.items[i]))
          this.selectedItems.push(this.items[i]);

      }
    }
    this.selectedItemsChange.emit(this.selectedItems);
  }

  // Should implement logic if we change isSelectable, selectedItem, isMultSelection and so on...
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {

    for (let propName in changes) {
      let changedProp = changes[propName];

      if (!changedProp.isFirstChange()) {
        if (this._innerTable && this._header)
          this._innerTable.removeChild(this._header);

        if (this._innerTable && this._body)
          this._innerTable.removeChild(this._body);

        this._bind();

      }
    }
  }





}
