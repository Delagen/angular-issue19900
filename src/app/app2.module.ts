import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Route2Component} from './route2.component';
import {Route3Component} from './route3.component';

@NgModule({
  declarations: [
    Route2Component,
    Route3Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild([
      {
        path: '',
        component: Route2Component
      },
      {
        path: '',
        component: Route2Component
      }
    ])
  ],
})
export class App2Module {
}
