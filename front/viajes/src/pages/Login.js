import { useForm } from "react-hook-form";
import useAuth from "../shared/hooks/useAuth";



export default function Login(params) {
const { handleSubmit, register } = useForm();

const { signIn, setTestData } = useAuth();

const loginSubmit = async (loginData) => {
  setTestData(['Rutas', 'Contacto']);
  signIn(loginData);

};

    return (
    <form onSubmit={handleSubmit(loginSubmit)}>

    <label htmlFor="email">email</label>    
    <input id="email" name="email" ref={register()}/>

    <label htmlFor="password">password</label>

    <input id="password" name="password" type="password" ref={register()} />

    
    <input type="submit" />    
    
    </form>
    );
}