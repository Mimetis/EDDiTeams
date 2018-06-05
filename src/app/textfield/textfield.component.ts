import { Component, OnInit, ContentChildren, forwardRef, QueryList, ElementRef } from '@angular/core';
import { TextFieldComponent } from '../modules/fabric/textfield.component';


@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.css']
})
export class TextfieldComponent {

  _container: HTMLElement;
  // @ContentChildren(forwardRef(() => TextFieldComponent), { descendants: true })
  // textFieldsQuery: QueryList<TextFieldComponent>;
  // textFields: TextFieldComponent[];

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    // @ts-ignore
    PR.prettyPrint();

    // get the container
    this._container = this.element.nativeElement;
  }

  textFieldValue: string;
  valueChanged($event) {
    this.textFieldValue = $event;
  }

  sample01 = `<fab-textfield label="Name"></fab-textfield>`
  sample02 = `<fab-textfield label="Name" [isRequired]="true"></fab-textfield>`
  sample03 = `<fab-textfield [isMultiLine]="true" label="Name"></fab-textfield>`
  sample04 = `<fab-textfield [isUnderlined]="true" [isRequired]="true" label="Name"></fab-textfield>`
  sample05 = `<fab-textfield [hasPlaceholder]="true" label="Name"></fab-textfield>`
  sample06 = `<fab-textfield [isUnderlined]="true" [hasPlaceholder]="true" [isRequired]="true" label="Name"></fab-textfield>`
  sample07 = `<fab-textfield [isUnderlined]="true" [hasPlaceholder]="true" [isRequired]="true" label="Name" (valueChanged)="valueChanged($event)"></fab-textfield>`
}
