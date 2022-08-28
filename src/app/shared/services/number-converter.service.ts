import { Injectable } from '@angular/core';

export interface INumberComponents {
    [name: string]: number;
}

@Injectable({
    providedIn: 'root'
})

export class PromiseService {
    deckonstructNumber(num: number): INumberComponents {
        let sign = 1;
        let coefficient = num;
        let exponent = 0;

        if (coefficient < 0) {
            coefficient = -coefficient;
            sign = -1;
        }

        if (Number.isFinite(num) && num !== 0) {
            exponent = -1128;
            let reduction = coefficient;

            while (reduction !== 0) {
                exponent += 1;
                reduction /= 2;
            }

            reduction = exponent;
            while (reduction > 0) {
                coefficient /= 2;
                reduction -= 1;
            }
            while (reduction < 0) {
                coefficient *= 2;
                reduction += 1;
            }
        }

        const finalNumber = num;

        return {
            sign,
            coefficient,
            exponent,
            finalNumber
        };
    }
}
