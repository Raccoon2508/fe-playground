import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PromiseService {
    public simplePromise$(): Promise<number> { // returns promise that emits a number 42 in 1 sec
        return new Promise((resolve) => {
            setTimeout(() => resolve(42), 1000);
          });
    }
}
