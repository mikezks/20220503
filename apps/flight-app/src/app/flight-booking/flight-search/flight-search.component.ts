/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Flight } from '@flight-workspace/flight-lib';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Observable, of, tap } from 'rxjs';
import * as fromFlightBooking from '../+state';
import { FlightSearchStoreService } from '../flight-search-store.service';


export interface Filter {
  from: string;
  to: string;
  urgent: boolean;
}

export interface LocalState {
  flights: Flight[];
  filters: Filter[];
}

export const initalLocalState: LocalState = {
  flights: [],
  filters: []
}


@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  providers: [
    ComponentStore,
    // FlightSearchStoreService
  ]
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;
  flights$: Observable<Flight[]> = this.globalStore.select(fromFlightBooking.selectActiveUserFlights);

  // "shopping basket" with selected flights
  basket: { [id: number]: boolean } = {
    3: true,
    5: true
  };

  /**
   * Updaters
   */

  addFilter = this.localStore.updater(
    (state, filter: Filter) => ({
      ...state,
      filters: [
        ...state.filters,
        filter
      ]
    })
  );

  /**
   * Selectors
   */

  selectFilters$ = this.localStore.select(
    // Selectors
    // Projectors
    state => state.filters
  );

  /**
   * Effects
   */

  searchFlights = this.localStore.effect(
    (searchTrigger$: Observable<number>) =>
      searchTrigger$.pipe(
        tap(() => this.globalStore.dispatch(
          fromFlightBooking.flightsLoad({
            from: this.from,
            to: this.to,
            urgent: this.urgent
          })
        ))
      )
  );

  constructor(
    private globalStore: Store<fromFlightBooking.FlightBookingRootState>,
    private localStore: ComponentStore<LocalState>) {
  }

  ngOnInit() {
    this.localStore.setState(initalLocalState);
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.addFilter({
      from: this.from,
      to: this.to,
      urgent: this.urgent
    });

    this.addFilter(of({
      from: this.from,
      to: this.to,
      urgent: this.urgent
    }));

    this.searchFlights(1);
    this.searchFlights(of(1));
  }

  delay(flight: Flight): void {
    this.globalStore.dispatch(
      fromFlightBooking.flightUpdate({
        flight: {
          ...flight,
          date: addMinutesToDate(flight.date, 15).toISOString(),
          delayed: true
        }
      })
    );
  }
}


export const addMinutesToDate = (date: Date | string, minutes: number): Date => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Date(dateObj.getTime() + minutes * 60 * 1_000);
};
