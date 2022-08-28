import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { bufferCount } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class SwissTimeService {
    swissTimeObservable$(): Observable<Date> {
        const swissTime$: Subject<Date> = new Subject<Date>();

        new Observable<Date>(obs => {
            setInterval(() => obs.next(new Date), 1000);
        })
            .pipe(bufferCount(5)).subscribe((next) => {
                for (let i = 0; i < next.length; i++) {
                    setTimeout(() => swissTime$.next(next[i]), i * 100);
                }
            });
        return swissTime$;
    }
}
