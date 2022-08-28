import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ObservablesComponent } from './observables.component';
import { ObservablesRoutingModule } from './observables-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [ObservablesComponent],
    imports: [
        ObservablesRoutingModule,
        FormsModule,
        CommonModule
    ],
    providers: [],
    bootstrap: []
})
export class ObservablesModule { }
