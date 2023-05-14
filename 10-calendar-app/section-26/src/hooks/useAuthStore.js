import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import {
  clearErrorMessage, onChecking, onLogin, onLogout,
} from '../store';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('/auth', { email, password });
      localStorage.setItem('token', data.token);

      // Util para realizar calculos con respecto a la hora de expiracion del token.
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout('Credenciales incorrectas'));
      // Con timeout pequeño para triggerear una ejecucion del useEffect en el LoginPage.jsx
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('/auth/new', { name, email, password });
      localStorage.setItem('token', data.token);

      // Util para realizar calculos con respecto a la hora de expiracion del token.
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout(error.response.data?.msg || 'Error interno.'));
      // Con timeout pequeño para triggerear una ejecucion del useEffect en el LoginPage.jsx
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };


  return {
    // Propiedades
    errorMessage,
    status,
    user,
    // Metodos
    startLogin,
    startRegister,
  };
};
