import { User } from '../../../../../../shared/schema/User';

export const authFeatureKey: 'auth' = 'auth';

export interface AuthState {
  CurrentUser: User | undefined;
}

export const AuthInitialState: AuthState = {
  CurrentUser: undefined
};
