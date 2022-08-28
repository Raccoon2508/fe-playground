import { Component, OnDestroy } from '@angular/core';
import { AsyncSubject, interval, Observable, Subject, ReplaySubject, BehaviorSubject } from 'rxjs';
import { takeUntil, take, filter, map } from 'rxjs/operators';
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
export class ObservablesComponent implements OnDestroy {

    isStarted = false;
    promiseResult: string | number = '-';
    swissTime: Date;
    blockNumber = 1;
    unsubscriber$: Subject<void> = new Subject<void>();

    firstObserverValue: number[] = [];
    secondObserverValue: number[] = [];

    exampleSubjectFirstArray: number[] = [];
    exampleSubjectSecondArray: number[] = [];
    exampleSubject$: Subject<number> = new Subject<number>();

    exampleReplaySubjectFirstArray: number[] = [];
    exampleReplaySubjectSecondArray: number[] = [];
    replaySubjectCount = 1;
    exampleReplaySubject$: ReplaySubject<number>;

    initialBehaviorSubject = 1;
    exampleBehaviorSubjectFirstArray: number[] = [];
    exampleBehaviorSubjectSecondArray: number[] = [];
    exampleBehaviorSubject$: BehaviorSubject<number>;

    exampleAsyncSubject$: AsyncSubject<number> = new AsyncSubject<number>();
    exampleAsyncSubjectFirstArray: number[] = [];
    exampleAsyncSubjectSecondArray: number[] = [];
    exampleAsyncSubjectTime = 0;
    exampleAsyncCurrentValueObservable: Subscription;
    exampleAsyncCurrentValueObservableAsync$: Observable<number>;

    pipesObservable$: Subject<number> = new Subject();
    pipesCurrentValue = 0;
    filterPipe: number[] = [];
    takePipe: number[] = [];
    mapPipe: number[] = [];
    scanPipe: number[] = [];

    someExampleObservable: Observable<number>;
    someExampleValuesArray = [];

    constructor(
        protected promiseService: PromiseService,
        protected swissTimeService: SwissTimeService,
        protected observablesService: ObservablesService,
        protected subjectsService: SubjectsService
    ) { }

    startPromise = (): Promise<string> => this.promiseService.simplePromise$().then((data: number)=> this.promiseResult = `${data}`);

    startSwissTime(): void {
        this.swissTimeService.swissTimeObservable$().pipe(takeUntil(this.unsubscriber$)).subscribe(date => this.swissTime = date);
    }

    startObservableExample(): void {
        const {firstStream$, secondStream$} = this.observablesService.observableExample$();
        firstStream$.subscribe(data => this.firstObserverValue = data);
        secondStream$.subscribe(data => this.secondObserverValue = data);
    }

    startSubject(): void {
        const {firstSubjectStream$, secondSubjectStream$} = this.subjectsService.exampleSubject$();
        firstSubjectStream$.pipe(takeUntil(this.unsubscriber$)).subscribe(data => {
            this.exampleSubjectFirstArray = data; console.log(data);
        });
        secondSubjectStream$.pipe(takeUntil(this.unsubscriber$)).subscribe(data => this.exampleSubjectSecondArray = data);
    }

    startReplaySubject(): void {
        this.exampleReplaySubject$ = new ReplaySubject<number>(this.replaySubjectCount);
        interval(1000).pipe(takeUntil(this.unsubscriber$)).subscribe(this.exampleReplaySubject$);

        this.exampleReplaySubject$.pipe(take(5), takeUntil(this.unsubscriber$)).subscribe(data => this.exampleReplaySubjectFirstArray.push(data));
        setTimeout(() => this.exampleReplaySubject$.pipe(take(5), takeUntil(this.unsubscriber$)).subscribe(data => this.exampleReplaySubjectSecondArray.push(data)), 4000);
    }

    startBehaviorSubject(initialValue: number): void {
        const exampleBehaviorSubject$ = this.subjectsService.startBehaviorSubject(initialValue);
        exampleBehaviorSubject$.pipe(take(5), takeUntil(this.unsubscriber$)).subscribe(data => this.exampleBehaviorSubjectFirstArray.push(data));
        exampleBehaviorSubject$.pipe(take(5), takeUntil(this.unsubscriber$)).subscribe(data => this.exampleBehaviorSubjectSecondArray.push(data));
    }

    startAsyncSubject(): void {
        interval(1000).pipe(takeUntil(this.unsubscriber$)).subscribe(this.exampleAsyncSubject$);
        this.exampleAsyncCurrentValueObservable = interval(1000).subscribe(data => this.exampleAsyncSubjectTime = data);
        this.exampleAsyncCurrentValueObservableAsync$ = interval(1000);

        this.exampleAsyncSubject$.pipe(takeUntil(this.unsubscriber$)).subscribe(data => this.exampleAsyncSubjectFirstArray.push(data));
        this.exampleAsyncSubject$.pipe(takeUntil(this.unsubscriber$)).subscribe(data => this.exampleAsyncSubjectSecondArray.push(data));
    }

    completeAsyncSubject(): void {
        this.exampleAsyncSubject$.complete();
        this.exampleAsyncCurrentValueObservable.unsubscribe();
    }

    startPipes(): void {
        interval(1000).pipe(takeUntil(this.unsubscriber$), take(10)).subscribe(this.pipesObservable$);

        this.pipesObservable$.subscribe(data => this.pipesCurrentValue = data); // without pipes
        this.pipesObservable$.pipe(filter(data => !!data)).subscribe(data => this.filterPipe.push(data));
        this.pipesObservable$.pipe(take(3)).subscribe(data => this.takePipe.push(data));
        this.pipesObservable$.pipe(map(item => item * item)).subscribe(data => this.mapPipe.push(data));
    }

    unsubscribe(): void {
        this.unsubscriber$.next();
    }

    ngOnDestroy(): void {
        this.unsubscriber$.next();
        this.unsubscriber$.complete();
    }
}
