import { Injectable } from '@angular/core';
import { Flight } from '@flight-workspace/flight-lib';
import { ComponentStore } from '@ngrx/component-store';

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

@Injectable(/* {
  providedIn: 'root'
} */)
export class FlightSearchStoreService extends ComponentStore<LocalState> {

}
