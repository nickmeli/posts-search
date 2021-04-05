import { createAction, props } from "@ngrx/store";
import { LoginRequest } from "../../../../../../shared/schema/LoginRequest";
import { LoginResponse } from "../../../../../../shared/schema/LoginRequest";
import { User } from "../../../../../../shared/schema/User";


export const loginAuth = createAction('[Auth/API] login', props<LoginRequest>());
export const loginAuthFailure = createAction('[Auth/API] login failure', props<{ e: any }>());
export const loginAuthSuccess = createAction('[Auth/API] login success', props<{ loginResponse: LoginResponse }>());
export const logoutAuth = createAction('[Auth] logout');

export const loadUser = createAction('[Auth/API] load user');
export const loadUserFailure = createAction('[Auth/API] load user failure', props<{ e: any }>());
export const loadUserSuccess = createAction('[Auth/API] load user success', props<{ user: User }>());
