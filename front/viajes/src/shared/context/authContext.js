import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../http/api';
import decodeToken from '../utils/decodeToken';


//creamos el contexto
export const AuthContext = React.createContext();
const AuthContextProvider = AuthContext.Provider;

const tokenData = decodeToken(localStorage.getItem('token'));

//creamos un custom provider

export function AuthProvider({ children }) {
    const history = useHistory();
    const [testData, setTestData] = useState([]);
    const [userData, setUserData] = useState(tokenData);
    const [isLogged, setisLogged] = useState(!!tokenData);

//funcion para iniciar sesion
    const signIn = async (loginData) => {
        const response = await login(loginData);
        const jsondata = await response.json();
        localStorage.setItem('token',jsondata.data.token);
        console.log(response.status, jsondata);
        const userData = decodeToken(jsondata.data.token);
        setUserData(userData);
        setisLogged(true);
        history.push('/');
    };
    //devolvemos los children envueltos en el provider
    return (
    <AuthContextProvider 
    value={{
        signIn: signIn, testData: testData, setTestData: setTestData, 
        userData: userData, isLogged: isLogged}}>
        {children}
        </AuthContextProvider>
    );
}
