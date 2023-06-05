

export interface AuthState {
  status: AuthStatus;
  user?: IUser;
  error?: string;
}

export const enum AuthStatus {
  AUTHENTICATED = "authenticated",
  NOT_AUTHENTICATED = "not-authenticated",
  CHECKING = "checking",
}

export interface IUser {
  id: string;
  fullName: string;
  email: string;
}

export const authInitialState: AuthState = {
  status: AuthStatus.NOT_AUTHENTICATED,
  error: undefined,
}