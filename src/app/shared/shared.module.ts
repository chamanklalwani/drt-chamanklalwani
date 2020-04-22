import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FilterTextboxModule } from './filter-textbox/filter-textbox.module';
import { PaginationModule } from './pagination/pagination.module';

import { CapitalizePipe } from './pipes/capitalize.pipe';
import { SortByDirective } from './directives/sortby.directive';

@NgModule({
  imports: [CommonModule, FilterTextboxModule, PaginationModule],
  exports: [CommonModule, FormsModule, CapitalizePipe, SortByDirective, FilterTextboxModule, PaginationModule],
  declarations: [CapitalizePipe, SortByDirective]
})
export class SharedModule { }
