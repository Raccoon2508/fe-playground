import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

const routes: Routes = [
    {path: '', redirectTo: 'about-me', pathMatch: 'full'},
    {path: 'observables', loadChildren: () => import('./observables/observables.module').then(m => m.ObservablesModule), pathMatch: 'full'},
    {path: 'about-me', loadChildren: () => import('./about-me/about-me.module').then(m => m.AboutMeModule), pathMatch: 'full'}
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
