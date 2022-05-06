// src/app/app.routes.ts

import { Route, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

export function addRouteToOutlets(route: Route, outlets: string []): Routes {
  return outlets.map(outlet => ({
    ...route,
    outlet
  }));
}

export const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'flight-booking',
        loadChildren: () => import('./flight-booking/flight-booking.module')
          .then(esm => esm.FlightBookingModule),
        data: {
          preload: true
        }
    },
    ...addRouteToOutlets({
        path: 'about',
        component: AboutComponent
    }, [
      'primary', 'aux'
    ]),
    {
        path: 'basket',
        component: BasketComponent,
        outlet: 'aux'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
