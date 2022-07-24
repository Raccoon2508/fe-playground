import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsyncSubject, interval, Observable, Observer, of, Subject, timer, ReplaySubject, BehaviorSubject, observable, Subscriber } from 'rxjs';
import { bufferCount, takeUntil, take, filter, map, scan } from 'rxjs/operators'
import { Subscription } from 'rxjs';
import { PromiseService } from './services/promise.service';
import { SwissTimeService } from './services/swiss-time.service';
import { ObservablesService } from './services/observables.service';
import { SubjectsService } from './services/subjects.service';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.scss'],
})
export class ObservablesComponent {

  isStarted: boolean = false;
  promiseResult: any = '-';
  swissTime: Date;
  blockNumber = 1;
  unsubscriber$: Subject<void> = new Subject<void>();

  firstObserverValue: number[] = [];
  secondObserverValue: number[] = [];

  constructor(
    protected promiseService: PromiseService,
    protected swissTimeService: SwissTimeService,
    protected observablesService: ObservablesService,
    protected subjectsService: SubjectsService
  ) { }

  startPromise = () => this.promiseService.simplePromise$().then(data => this.promiseResult = data);

  startSwissTime(): void {
    this.swissTimeService.swissTimeObservable$().pipe(takeUntil(this.unsubscriber$)).subscribe(date => this.swissTime = date);
  }

  startObservableExample(): void {
    const {firstStream$, secondStream$} = this.observablesService.observableExample$();
    firstStream$.subscribe(data => this.firstObserverValue = data);
    secondStream$.subscribe(data => this.secondObserverValue = data);
  }

  exampleSubjectFirstArray: number[] = [];
  exampleSubjectSecondArray: number[] = [];
  exampleSubject$: Subject<number> = new Subject<number>();

  startSubject(): void {
    const {firstSubjectStream$, secondSubjectStream$} = this.subjectsService.exampleSubject$();
    firstSubjectStream$.pipe(takeUntil(this.unsubscriber$)).subscribe(data => {this.exampleSubjectFirstArray = data; console.log(data);});
    secondSubjectStream$.pipe(takeUntil(this.unsubscriber$)).subscribe(data => this.exampleSubjectSecondArray = data);
  }

  exampleReplaySubjectFirstArray: number[] = [];
  exampleReplaySubjectSecondArray: number[] = [];
  replaySubjectCount = 1;
  exampleReplaySubject$: ReplaySubject<number>

  startReplaySubject() {
    this.exampleReplaySubject$ = new ReplaySubject<number>(this.replaySubjectCount);
    interval(1000).pipe(takeUntil(this.unsubscriber$)).subscribe(this.exampleReplaySubject$);

    this.exampleReplaySubject$.pipe(take(5), takeUntil(this.unsubscriber$)).subscribe(data => this.exampleReplaySubjectFirstArray.push(data));
    setTimeout(() => this.exampleReplaySubject$.pipe(take(5), takeUntil(this.unsubscriber$)).subscribe(data => this.exampleReplaySubjectSecondArray.push(data)), 4000);
  }

  initialBehaviorSubject: number = 1;
  exampleBehaviorSubjectFirstArray: number[] = [];
  exampleBehaviorSubjectSecondArray: number[] = [];
  exampleBehaviorSubject$: BehaviorSubject<number>;


  startBehaviorSubject(initialValue: number) {
    const exampleBehaviorSubject$ = this.subjectsService.startBehaviorSubject(initialValue);
    exampleBehaviorSubject$.pipe(take(5), takeUntil(this.unsubscriber$)).subscribe(data => this.exampleBehaviorSubjectFirstArray.push(data));
    exampleBehaviorSubject$.pipe(take(5), takeUntil(this.unsubscriber$)).subscribe(data => this.exampleBehaviorSubjectSecondArray.push(data));
  }

  exampleAsyncSubject$: AsyncSubject<number> = new AsyncSubject<number>()
  exampleAsyncSubjectFirstArray: number[] = [];
  exampleAsyncSubjectSecondArray: number[] = [];
  exampleAsyncSubjectTime: number = 0;
  exampleAsyncCurrentValueObservable: Subscription;
  exampleAsyncCurrentValueObservableAsync$: Observable<number>;

  startAsyncSubject() {
    interval(1000).pipe(takeUntil(this.unsubscriber$)).subscribe(this.exampleAsyncSubject$);
    this.exampleAsyncCurrentValueObservable = interval(1000).subscribe(data => this.exampleAsyncSubjectTime = data);
    this.exampleAsyncCurrentValueObservableAsync$ = interval(1000);

    this.exampleAsyncSubject$.pipe(takeUntil(this.unsubscriber$)).subscribe(data => this.exampleAsyncSubjectFirstArray.push(data));
    this.exampleAsyncSubject$.pipe(takeUntil(this.unsubscriber$)).subscribe(data => this.exampleAsyncSubjectSecondArray.push(data));
  }

  completeAsyncSubject() {
    this.exampleAsyncSubject$.complete();
    this.exampleAsyncCurrentValueObservable.unsubscribe();
  }

  pipesObservable$: Subject<number> = new Subject();
  pipesCurrentValue = 0;
  filterPipe: number[] = [];
  takePipe: number[] = [];
  mapPipe: number[] = [];
  scanPipe: number[] = [];

  startPipes() {
    interval(1000).pipe(takeUntil(this.unsubscriber$), take(10)).subscribe(this.pipesObservable$);

    this.pipesObservable$.subscribe(data => this.pipesCurrentValue = data); //without pipes
    this.pipesObservable$.pipe(filter(data => !!data)).subscribe(data => this.filterPipe.push(data));
    this.pipesObservable$.pipe(take(3)).subscribe(data => this.takePipe.push(data));
    this.pipesObservable$.pipe(map(item => item * item)).subscribe(data => this.mapPipe.push(data));
  }

  unsubscribe(): void {
    this.unsubscriber$.next();
  }

  someExampleObservable: Observable<number>;
  someExampleValuesArray = [];

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

}
