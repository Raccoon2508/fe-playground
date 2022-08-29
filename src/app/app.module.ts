import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NavMenuComponent } from './shared/components/nav-menu/nav-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/angular-material.module';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule
    ],
    exports: [MaterialModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
