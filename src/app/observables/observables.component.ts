import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { bufferCount, takeUntil } from 'rxjs/operators'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.css'],
})
export class ObservablesComponent implements OnInit {

  constructor() { }
  isStarted: boolean = false;
  promiseResult: any = '-';
  swissTime: Date;
  blockNumber = 1;
  unsubscriber$: Subject<void> = new Subject<void>();

  swissTime$: Observable<Date[]> = new Observable<Date>(obs => {
    setInterval(() => obs.next(new Date), 1000);})
    .pipe(bufferCount(5), takeUntil(this.unsubscriber$));

  startPromise() {
     const promise$ = new Promise((resolve) => {
       setTimeout(() => resolve(42), 1000);
     });

     promise$.then(data => this.promiseResult = data);
  }

  startSwissTime() {
    this.swissTime$.subscribe((next) => {
      for (let i = 0; i < next.length; i++ ) {
      setTimeout(() => this.swissTime = next[i], i * 100);
      }
  });
  }

  unsubscribe() {
    this.unsubscriber$.next();
  }

  ngOnInit(): void {
  }

}
