import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})

export class SubjectsService {
    subject$: Subject<number> = new Subject<number>();

    exampleSubject$(): {[name: string]: Subject<number[]>} {
      const firstValuesArray: number[] = [];
      const secondValueArray: number[] = [];

      const firstSubjectStream$: Subject<number[]> = new Subject<number[]>();
      const secondSubjectStream$: Subject<number[]> = new Subject<number[]>();

      const exampleSubject$: Subject<number> = new Subject<number>();

      interval(1000).subscribe(exampleSubject$);

      exampleSubject$.pipe(take(5)).subscribe(data => {
        firstValuesArray.push(data);
        firstSubjectStream$.next(firstValuesArray);
      });

      setTimeout(() => exampleSubject$.pipe(take(5)).subscribe(data => {
        secondValueArray.push(data);
        secondSubjectStream$.next(secondValueArray);
      }), 4000);

      return {firstSubjectStream$, secondSubjectStream$};
    }

    startBehaviorSubject(initialValue: number): BehaviorSubject<number> {
      const exampleBehaviorSubject$ = new BehaviorSubject<number>(initialValue);
      interval(1000).subscribe(exampleBehaviorSubject$);
      return exampleBehaviorSubject$;
    }
}
