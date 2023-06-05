import { useEffect } from 'react';

import Swal from 'sweetalert2';

import { useAuthStore } from '../../hooks';
import { useForm } from '../../hooks/useForm';
import './loginPage.css';

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
}

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
}

export const LoginPage = () => {

  const { loginEmail, loginPassword, 
    formState: loginFormState, onInputChange: onLoginInputChange 
  } = useForm(loginFormFields);
  const { registerName, registerEmail, registerPassword, registerPassword2, 
    formState: registerFormState, onInputChange: onRegisterInputChange 
  } = useForm(registerFormFields);

  const { startLogin, startRegister, error } = useAuthStore();

  const onLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await startLogin(loginEmail, loginPassword);
  };

  const onRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (registerPassword !== registerPassword2) {
      return Swal.fire('Error', 'Passwords must match', 'error');
    }
    await startRegister(registerEmail, registerPassword, registerName);
  };

  useEffect(() => {
    if (error) {
      Swal.fire('Error', error, 'error')
    }
  }, [error]);

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Login</h3>
          <form
            onSubmit={ onLoginSubmit }
            >
            <div className="form-group mb-2">
              <input 
                type="text"
                className="form-control"
                placeholder="Email"
                name="loginEmail"
                value={ loginEmail }
                onChange={ onLoginInputChange }
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="loginPassword"
                value={ loginPassword }
                onChange={ onLoginInputChange }
              />
            </div>
            <div className="form-group mb-2">
              <input 
                type="submit"
                className="btnSubmit"
                value="Login" 
              />
            </div>
          </form>
      </div>

      <div className="col-md-6 login-form-2">
          <h3>REgister</h3>
          <form
            onSubmit={ onRegisterSubmit }
            >
            <div className="form-group mb-2">
              <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="registerName"
                  value={ registerName }
                  onChange={ onRegisterInputChange }
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="registerEmail"
                value={ registerEmail }
                onChange={ onRegisterInputChange }
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Password" 
                name="registerPassword"
                value={ registerPassword }
                onChange={ onRegisterInputChange }
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password" 
                name="registerPassword2"
                value={ registerPassword2 }
                onChange={ onRegisterInputChange }
              />
            </div>

            <div className="form-group mb-2">
              <input 
                type="submit" 
                className="btnSubmit" 
                value="Create account"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}