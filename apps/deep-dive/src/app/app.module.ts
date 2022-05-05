// src/app/app.module.ts

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from './shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
   imports: [
      RouterModule.forRoot(APP_ROUTES, {
        preloadingStrategy: PreloadAllModules
      }),
      HttpClientModule,
      BrowserModule,
      // FlightBookingModule,
      SharedModule,
   ],
   declarations: [
      AppComponent,
      SidebarComponent,
      NavbarComponent,
      HomeComponent,
      AboutComponent,
      NotFoundComponent,
      BasketComponent,
   ],
   providers: [
      /* {
        provide: FlightService,
        useFactory: (http: HttpClient) => {
          return new FlightService(http);
        },
        deps: [HttpClient]
      } */
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
