import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Flight } from './flight';
import { FlightService } from './flight.service';

@Injectable({
  providedIn: 'root'
})
export class DummyFlightService implements FlightService {
  flights: Flight[] = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  load(): void {
    this.find().subscribe(
      flights => this.flights = flights
    );
  }

  find(): Observable<Flight[]> {
    return of([{
      id: 999,
      from: 'London',
      to: 'New York',
      date: new Date().toISOString(),
      delayed: false
    }]);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  delay(): void {}
}
