import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { LabelComponent } from './label/label.component';
import { LinkComponent } from './link/link.component';
import { TableComponent } from './table/table.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadiobuttonComponent } from './radiobutton/radiobutton.component';
import { ChoiceFieldGroupComponent } from './choicefieldgroup/choicefieldgroup.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ButtonComponent, DropdownComponent, LabelComponent, LinkComponent,
    TableComponent, CheckboxComponent, RadiobuttonComponent, ChoiceFieldGroupComponent],
  exports: [
    ButtonComponent, DropdownComponent, LabelComponent, LinkComponent,
    TableComponent, CheckboxComponent, RadiobuttonComponent, ChoiceFieldGroupComponent]
})
export class FabricModule { }
