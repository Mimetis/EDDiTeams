import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.selectedItems = this.items.filter(i => i.key == "1" || i.key == "3");
  }

  ngAfterViewInit() {
    // @ts-ignore
    PR.prettyPrint();
  }

  items = [
    { key: "1", value: "Option 1", isDisabled: false },
    { key: "2", value: "Option 2", isDisabled: false },
    { key: "3", value: "Option 3", isDisabled: true },
  ];

  items2 = [];
  selectedItems = [];

  itemsHeaders = ["ID", "Option", "Selected ?"]

  sample01 = `<fab-table [items]="items"></fab-table>`;
  sample02 = `<fab-table [items]="items" [isSelectable]="true" [isMultiSelection]="false"></fab-table>`;
  sample03 = `<fab-table [items]="items" [isSelectable]="true" [isMultiSelection]="true"></fab-table>`;
  sample04 = `<fab-table [isSelectable]="true" [isMultiSelection]="true" [(selectedItems)]="selectedItems" [headers]="itemsHeaders" [items]="items"></fab-table>`;
  sample05 = `<fab-table [headers]="itemsHeaders" [items]="items2"></fab-table>`;

  selectItems() {
    this.items2 = [
      { key: "1", value: "Option 101", isDisabled: false },
      { key: "2", value: "Option 102", isDisabled: false },
      { key: "3", value: "Option 103", isDisabled: true },
    ];
  }
}
