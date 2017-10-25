import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {Observable} from 'rxjs/Observable';
import {map, mergeMap, take, tap} from 'rxjs/operators';

@Injectable()
export class RouteGuardService implements CanActivate, CanActivateChild {
  constructor(@Inject(Router) protected router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return fromPromise(Promise.resolve(false))
      .pipe(
        take(1),
        tap((authenticated) => {
          if (!authenticated) {
            this.router.navigateByUrl('/route1');
          }
        }),
        mergeMap((authenticated) => fromPromise(Promise.resolve({}))
          .pipe(
            take(1),
            map((data) => {
              if (authenticated) {
                if (state.url.toString() !== '/settings/change-password' && data) {
                  this.router.navigateByUrl('/settings/change-password');
                  return false;
                }
              }
              return authenticated;
            })
          )
        )
      );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}
