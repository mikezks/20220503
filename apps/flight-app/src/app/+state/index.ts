import { getSelectors, routerReducer, RouterReducerState } from '@ngrx/router-store';
import {
  ActionReducerMap, createFeatureSelector, MetaReducer
} from '@ngrx/store';
import { combineLatestWith, map, of } from 'rxjs';
import { environment } from '../../environments/environment';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface State {

}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];


export const selectRouter = createFeatureSelector<RouterReducerState>('router');

export const {
  selectRouteParams
} = getSelectors(selectRouter);


export const mySelectors = {
  selectRouteParams: 'random',
  selectMyUserState: 'michael'
};

export const {
  selectMyUserState: userState
} = mySelectors;

console.log(userState);

of(1).pipe(
  combineLatestWith([of(2)]),
  map(([no1, no2]) => no1)
)
