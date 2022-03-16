import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  notify$ = new Subject<any>();

  constructor() {}

  notify(obj) {
    this.notify$.next(obj);
  }
}
