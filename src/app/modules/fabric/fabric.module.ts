import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { DropdownComponent } from './dropdown.component';
import { LabelComponent } from './label.component';
import { LinkComponent } from './link.component';
import { TableComponent } from './table.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ChoicesComponent, ChoiceComponent } from './choices.component';
import { TextFieldComponent } from "./textfield.component";
import { DialogComponent, DialogActionsComponent, DialogContentComponent, DialogTitleComponent } from './dialog.component';
import { OverlayComponent } from './overlay.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ButtonComponent, DropdownComponent, LabelComponent, LinkComponent,
    TableComponent, CheckboxComponent, ChoicesComponent, ChoiceComponent, ChoicesComponent,
    TextFieldComponent, DialogComponent, DialogActionsComponent, DialogContentComponent, DialogTitleComponent,
    OverlayComponent],
  exports: [
    ButtonComponent, DropdownComponent, LabelComponent, LinkComponent,
    TableComponent, CheckboxComponent, ChoicesComponent, ChoiceComponent,
    TextFieldComponent, DialogComponent, DialogActionsComponent, DialogContentComponent, DialogTitleComponent,
    OverlayComponent],

})
export class FabricModule { }
