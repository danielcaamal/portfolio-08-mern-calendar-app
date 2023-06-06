import { calendarApi, getErrorMessageFromResponse } from "../api";
import { useAppDispatch, useAppSelector } from "../store";
import { onChecking, onError, onLogin, onLogout } from "../store/auth";


export const useAuthStore = () => {
  const authState = useAppSelector((state) => state.auth);
  const { status, user, error } = authState;
  const dispatch = useAppDispatch();


  const startLogin = async (email: string, password: string) => {
    dispatch(onChecking());
    try { 
      const { data } = await calendarApi.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());
      dispatch(onLogin({
        id: data.id,
        email: data.email,
        fullName: data.fullName,
      }));
    } catch (error: any) {
      const errorMessage = getErrorMessageFromResponse(error);
      if (errorMessage) {
        dispatch(onError(errorMessage));
        return errorMessage;
      }
      dispatch(onError('An error occurred while trying to login'));
    }
  };

  const startLogout = async () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  const startRegister = async (email: string, password: string, fullName: string, ) => {
    dispatch(onChecking());
    try { 
      const { data } = await calendarApi.post('/auth/register', { email, password, fullName });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());
      dispatch(onLogin({
        id: data.id,
        email: data.email,
        fullName: data.fullName,
      }));
    } catch (error: any) {
      const errorMessage = getErrorMessageFromResponse(error);
      if (errorMessage) {
        dispatch(onError(errorMessage));
        return errorMessage;
      }
      dispatch(onError('An error occurred while trying to register'));
    }
  };

  const checkAuthToken = async () => {
    dispatch(onChecking());
    const token = localStorage.getItem('token');
    if (!token) {
      return dispatch(onLogout());
    }
    try { 
      const { data } = await calendarApi.post('/auth/refresh-token');
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());
      dispatch(onLogin({
        id: data.id,
        email: data.email,
        fullName: data.fullName,
      }));
    } catch (error: any) {
      const errorMessage = getErrorMessageFromResponse(error);
      if (errorMessage) {
        dispatch(onError(errorMessage));
        return errorMessage;
      }
      dispatch(onError('An error occurred while trying to register'));
      dispatch(onLogout());
    }
  };


  return {  
    // Properties
    status,
    user, 
    error,
    // Methods
    startLogin,
    startLogout,
    startRegister,
    checkAuthToken,
  };
};