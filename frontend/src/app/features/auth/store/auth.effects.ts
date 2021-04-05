import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { EMPTY, Observable, of } from "rxjs";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { AuthService } from "../auth.service";
import { AuthActions } from ".";
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { User } from "../../../../../../shared/schema/User";
import { LoginRequest, LoginResponse } from "../../../../../../shared/schema/LoginRequest";
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class AuthEffects {
  login$: Observable<Action>;
  loginFailure$: Observable<Action>;
  loginSuccess$: Observable<Action>;
  logout$: Observable<Action>;

  loadUser$: Observable<Action>;

  constructor(
    private readonly actions$: Actions,
    private readonly authApi: AuthService,
    private readonly router: Router,
    private readonly cookieService: CookieService,
  ) {
    this.actions$ = actions$;
    this.authApi = authApi;

    this.login$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.loginAuth),
        switchMap((data: LoginRequest) =>
          this.authApi.login(data).pipe(
            map((loginResponse: LoginResponse) => AuthActions.loginAuthSuccess({ loginResponse })),
            catchError((e: any) => of(AuthActions.loginAuthFailure({ e }))),
          ),
        )
      ),
    );

    this.loginFailure$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.loginAuthFailure),
        switchMap((e: { e: any }) => {
          console.log('Error: ', e.e); // ToDo show notification
          return EMPTY
        }),
      ),
      { dispatch: false }
    );

    this.loginSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.loginAuthSuccess),
        switchMap(({ loginResponse }: { loginResponse: LoginResponse }) => {
          this.cookieService.set('posts-sid', loginResponse.sid);
          this.router.navigate(['/']);
          return EMPTY;
        })
      ),
      { dispatch: false }
    );

    this.logout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logoutAuth),
        switchMap(() => {
          this.cookieService.delete('posts-sid');
          this.router.navigate(['/login']);
          return EMPTY;
        }),
      ),
      { dispatch: false }
    );

    this.loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUser),
      switchMap(() =>
        this.authApi.loadUser().pipe(
          map((user: User) => AuthActions.loadUserSuccess({ user })),
          catchError((e: any) => of(AuthActions.loginAuthFailure({ e }))),
        ),
      )
    ),
  );
  }
}
