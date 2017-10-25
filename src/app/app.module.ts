import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {Route1Component} from './route1.component';
import {RouteGuardService} from './route-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    Route1Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'route2'
      },
      {
        path: 'route1',
        component: Route1Component
      },
      {
        path: 'route2',
        canActivate: [RouteGuardService],
        canActivateChild: [RouteGuardService],
        loadChildren: './app2.module#App2Module'
      }
    ], {useHash: true})
  ],
  providers: [RouteGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
