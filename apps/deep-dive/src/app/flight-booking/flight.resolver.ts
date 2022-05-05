import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { delay, Observable, of } from 'rxjs';
import { Flight } from './flight';
import { FlightService } from './flight.service';

@Injectable({
  providedIn: 'root'
})
export class FlightResolver implements Resolve<Flight[]> {

  constructor(private flightService: FlightService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Flight[]> {
    return this.flightService.find('Graz', 'Hamburg').pipe(
      delay(5_000)
    );
  }
}
