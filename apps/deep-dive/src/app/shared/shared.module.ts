// src/app/shared/shared.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateComponent } from './date/date.component';
import { CityPipe } from './city.pipe';
import { StatusColorPipe } from './status-color.pipe';
import { StatusFilterPipe } from './status-filter.pipe';
import { FormsModule } from '@angular/forms';

import { CityValidationDirective } from './validation/city-validation.directive';
import { DateCvaDirective } from './date-directive/date-cva.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    DateComponent,
    DateCvaDirective,
    CityPipe,
    StatusColorPipe,
    StatusFilterPipe,
    CityValidationDirective
  ],
  exports: [
    DateComponent,
    DateCvaDirective,
    CityPipe,
    StatusColorPipe,
    StatusFilterPipe,
    FormsModule,
    CommonModule,
    CityValidationDirective
  ]
})
export class SharedModule { }
