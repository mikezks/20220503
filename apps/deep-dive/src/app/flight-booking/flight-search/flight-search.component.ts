// src/app/flight-search/flight-search.component.ts

import { Component, OnInit } from '@angular/core';
import { DummyFlightService } from '../dummy-flight.service';
import { Flight } from '../flight';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
  providers: [
    // FlightService
    /* {
      provide: FlightService,
      useClass: DummyFlightService
    } */
  ]
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg';
  to = 'Graz';
  selectedFlight: Flight | null = null;
  delayFilter = false;

  get flights() {
    // We will refactor this to an observable in a later exercise!
    return this.flightService.flights;
  }

  basket: { [key: number]: boolean } = {
    3: true,
    5: true
  };

  constructor(private flightService: FlightService) {
  }

  ngOnInit(): void {
  }

  search(): void {
    if (!this.from || !this.to) {
      return;
    }

    this.flightService.load(this.from, this.to);
  }

  select(f: Flight): void {
    this.selectedFlight = f;
  }

  delay(): void {
    this.flightService.delay();
  }

}
