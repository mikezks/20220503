// src/app/flight-booking/flight-booking.module.ts

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoadingEventModule } from '../shared/router/lazy-event.module';
import { SharedModule } from '../shared/shared.module';
import { FlightApiModule } from './flight-api/flight-api.module';
import { FlightBookingComponent } from './flight-booking.component';
import { FLIGHT_BOOKING_ROUTES } from './flight-booking.routes';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';

@NgModule({
  imports: [
    RouterModule.forChild(FLIGHT_BOOKING_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    FlightApiModule,
    SharedModule,
    LoadingEventModule.define(FlightBookingModule)
  ],
  declarations: [
    FlightSearchComponent,
    FlightCardComponent,
    PassengerSearchComponent,
    FlightBookingComponent,
    FlightEditComponent
  ],
  exports: [
    FlightSearchComponent,
  ]
})
export class FlightBookingModule { }

export const myState = {
  selectedFlightId: 999
};
