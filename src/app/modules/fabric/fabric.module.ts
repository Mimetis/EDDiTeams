import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { LabelComponent } from './label/label.component';
import { LinkComponent } from './link/link.component';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ButtonComponent, DropdownComponent, LabelComponent, LinkComponent,
    TableComponent],
  exports: [
    ButtonComponent, DropdownComponent, LabelComponent, LinkComponent,
    TableComponent]
})
export class FabricModule { }
