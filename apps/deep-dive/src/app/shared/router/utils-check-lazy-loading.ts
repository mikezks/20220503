import { Type } from "@angular/core";
import { environment } from "apps/deep-dive/src/environments/environment";


const PACKAGE_SCOPE = '@angular-architects/lazy-utils';
const LOADING_EVENTNAME = 'module-loaded';


function getNgModuleName(esm: Record<string, unknown>): string {
  return Object.keys(esm).find(k => k.includes('Module')) || '';
}

function throwModuleLoadingError(ngModuleName: string, shallThrow: boolean): void {
  if (shallThrow) {
    throw new Error(
      `${ ngModuleName } is configured for lazy loaded, but statically imported as well.`
    );
  }
}

function listenToModuleLoadingEvent(callbackFn: () => void): () => void {
  const listenerConfig: [ string, () => void ] = [
    `${ PACKAGE_SCOPE }:${ LOADING_EVENTNAME }`,
    callbackFn
  ];
  document.addEventListener(...listenerConfig)
  return () => document.removeEventListener(...listenerConfig);
}

function getCancelLoadingState(): (cancel?: boolean) => boolean {
  let shallCancelError = false;
  return (cancel?: boolean) => {
    shallCancelError = shallCancelError || !!cancel;
    return shallCancelError;
  };
}


export function dispatchLoadingEvent<T>(ngModule: Type<T>) {
  document.dispatchEvent(
    new CustomEvent(
      `${ PACKAGE_SCOPE }:${ LOADING_EVENTNAME }`,
      { detail: { ngModule: ngModule.name }}
    )
  );
}

export function checkLazyLoaded<T extends Record<string, unknown>>(loadFn: () => Promise<T>): Promise<T> {
  if (!environment.production) {
    const cancelFn = getCancelLoadingState();

    const removeListenerFn = listenToModuleLoadingEvent(() => cancelFn(true));

    return loadFn().then(esm => {
      setTimeout(() => {
        throwModuleLoadingError(getNgModuleName(esm), !cancelFn());
        removeListenerFn();
      });

      return esm;
    });
  }
  return loadFn();
}
