import { Observable, BehaviorSubject } from 'rxjs';

export class Store<T> {
  readonly state$: Observable<T>;
  private _state$: BehaviorSubject<T>;

  constructor(initialState: T) {
    this._state$ = new BehaviorSubject<T>(initialState);
    this.state$ = this._state$.asObservable();
  }

  get state(): T {
    return this._state$.getValue();
  }

  setState(nextState: T): void {
    this._state$.next(nextState);
  }
}
