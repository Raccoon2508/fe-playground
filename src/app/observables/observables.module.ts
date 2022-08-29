/* eslint-disable no-restricted-imports */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ObservablesComponent } from './observables.component';
import { ObservablesRoutingModule } from './observables-routing.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/angular-material.module';

@NgModule({
    declarations: [ObservablesComponent],
    imports: [
        ObservablesRoutingModule,
        FormsModule,
        CommonModule,
        MaterialModule
    ],
    providers: [],
    bootstrap: []
})
export class ObservablesModule { }
