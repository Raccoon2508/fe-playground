import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservablesService {

  constructor() { }

  observableExample$(): {[name: string]: Subject<number[]>} {
    const exampleObservable$: Observable<number> = of(1, 2, 3, 4, 5);
    const firstArray: number[] = [];
    const secondArray: number[] = [];

    const firstStream$: Subject<number[]> = new Subject<number[]>();
    const secondStream$: Subject<number[]> = new Subject<number[]>();

    exampleObservable$.subscribe((value) => {
      setTimeout(() => {
        firstArray.push(value);
        firstStream$.next(firstArray);
      }, value * 1000);
    })

    setTimeout(() => exampleObservable$.subscribe((value) => {
      setTimeout(() => {
        secondArray.push(value);
        secondStream$.next(secondArray);
      }, value * 1000);
    }), 2000);

    return {firstStream$, secondStream$};
  }
}
