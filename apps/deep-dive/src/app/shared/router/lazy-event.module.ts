import { ModuleWithProviders, NgModule, Type } from "@angular/core";
import { environment } from "apps/deep-dive/src/environments/environment";
import { dispatchLoadingEvent } from "./utils-check-lazy-loading";

@NgModule()
export class LoadingEventModule {
  static define<T>(ngModule: Type<T>): ModuleWithProviders<LoadingEventModule> {
    !environment.production && dispatchLoadingEvent(ngModule);
    return { ngModule: LoadingEventModule };
  }
}
