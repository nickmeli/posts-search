import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { AuthActions } from ".";
import { LoginResponse } from "../../../../../../shared/schema/LoginRequest";
import { User } from "../../../../../../shared/schema/User";
import { AuthInitialState, AuthState } from "./auth.state";


const authReducer: ActionReducer<AuthState, Action> = createReducer(
  AuthInitialState,
  on(
    AuthActions.loginAuthSuccess,
    (state: AuthState, { loginResponse }: { loginResponse: LoginResponse }): AuthState => ({
      CurrentUser: loginResponse.user
    })
  ),
  on(
    AuthActions.loadUserSuccess,
    (state: AuthState, { user }: { user: User }): AuthState => ({
      CurrentUser: user
    })
  ),
);

export function AuthReducer(state: AuthState | undefined, action: Action): AuthState {
  return authReducer(state, action);
}
