// src/app/default-flight.service.ts

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BASE_URL } from '../app.token';
import { DefaultFlightService } from './default-flight.service';
import { DummyFlightService } from './dummy-flight.service';
import { Flight } from './flight';
import { FlightApiModule } from './flight-api/flight-api.module';

@Injectable({
  providedIn: FlightApiModule,
  useFactory: (http: HttpClient, baseUrl: string) => {
    if (environment.flightServiceType === 'http') {
      return new DefaultFlightService(http, baseUrl);
    } else {
      return new DummyFlightService();
    }
  },
  // useClass: DefaultFlightService,
  deps: [
    HttpClient,
    [Inject, BASE_URL]
  ]
})
export abstract class FlightService {

  // We will refactor this to an observable in a later exercise!
  flights: Flight[] = [];

  abstract load(from: string, to: string): void;

  abstract find(from: string, to: string): Observable<Flight[]>;

  abstract delay(): void;
}
