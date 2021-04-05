import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { AppState } from "src/app/core/store/app.state";
import { AuthActions } from ".";
import { LoginRequest } from "../../../../../../shared/schema/LoginRequest";
import { User } from "../../../../../../shared/schema/User";
import { selectCurrentUser } from "./auth.selectors";
import { AuthState } from "./auth.state";


@Injectable()
export class AuthFacade {
  currentUser$: Observable<User | undefined>;

  constructor(
    private readonly store: Store<AppState>
  ) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
  }

  login(loginRequest: LoginRequest): void {
    this.store.dispatch(AuthActions.loginAuth(loginRequest));
  }

  logout(): void {
    this.store.dispatch(AuthActions.logoutAuth());
  }

  getUser(): User | undefined {
    let user: User | undefined = undefined;

    this.currentUser$.pipe(take(1)).subscribe((u: User | undefined) => user = u);
    return user;
  }

  loadUser(): void {
    this.store.dispatch(AuthActions.loadUser());
  }
}
