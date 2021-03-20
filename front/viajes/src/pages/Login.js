import { useForm } from "react-hook-form";
import { login } from '../http/api';


export default function Login(params) {
const { handleSubmit, register } = useForm()

const loginSubmit = async (loginData) => {

const response = await login(loginData);
const data = await response.json();
console.log(response.status, data);

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