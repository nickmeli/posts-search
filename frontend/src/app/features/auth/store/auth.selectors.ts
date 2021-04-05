import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { AppState } from "src/app/core/store/app.state";
import { User } from "../../../../../../shared/schema/User";
import { authFeatureKey, AuthState } from "./auth.state";

export const selectAuthState: MemoizedSelector<AppState, AuthState> = createFeatureSelector<AuthState>(authFeatureKey);

export const selectCurrentUser: MemoizedSelector<AppState, User | undefined> = createSelector(
  selectAuthState,
  (state: AuthState) => state.CurrentUser,
);
