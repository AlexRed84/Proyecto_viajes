import React from 'react';
import decodeTokenData from '../utils/decodeTokenData';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../http/api2';
import { signUpApi } from '../../http/api2';
import { recover, resetPass } from '../../http/api2';
import { updateInfo } from '../../http/api2';
//import { deleteProduct } from '../../http/api2';

// 1 Creamos el contexto y exportamos para usar en el hook
export const AuthContext = React.createContext();
const AuthContextProvider = AuthContext.Provider;

// 2 Recuperamos el token del localStorage
let token = localStorage.getItem('token');
let tokenObject = decodeTokenData(token);
if (!token) {
  token = sessionStorage.getItem('token');
  tokenObject = decodeTokenData(token);
}

// 3 Creamos un custom provider
export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(tokenObject);
  const [isUserLogged, setIsUserLogged] = useState(!!tokenObject);
  const history = useHistory();

  // Método para hacer log in desde los componentes
  const signIn = async (email, password, confirmPassword, remember) => {
    const loginData = await login(email, password, confirmPassword);
    if (remember) {
      localStorage.setItem('token', loginData);
    } else {
      sessionStorage.setItem('token', loginData);
      localStorage.removeItem('token');
    }
    const tokenObject = decodeTokenData(loginData);
    setUserData(tokenObject);
    setIsUserLogged(true);
    history.push('/');
  };

  // Método para registrarse
  const signUp = async ( email, password, confirmPassword) => {
    const message = await signUpApi( email, password, confirmPassword);
    return message;
    
  };

  // Método que borra las credenciales del localStorage y del state
  const signOut = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    history.push('/login');
    setUserData(null);
    setIsUserLogged(false);
  };
  const recoverPass = async (email) => {
    const message = await recover(email);
    return message;
  };
  const resetPassword = async (recovertoken, password, confirmPassword) => {
    const message = await resetPass(recovertoken, password, confirmPassword);
    return message;
  };
  const updateInfoUser = async (data) => {
    const message = await updateInfo(data, userData?.id);
    return message;
  };
  // const deleteProducts = async (id_product) => {
  //   console.log(id_product);
  //   await deleteProduct(userData?.id, id_product);
  //   history.push(`/profile/${userData?.id}/all`);
  // };
  // 4 devolvemos el provider metiendole dentro los children
  return (
    <AuthContextProvider
      value={{
        //deleteProducts,
        token,
        updateInfoUser,
        userData,
        signIn,
        signOut,
        signUp,
        isUserLogged,
        recoverPass,
        resetPassword,
      }}
    >
      {children}
    </AuthContextProvider>
  );
}
