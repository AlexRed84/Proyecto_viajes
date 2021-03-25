import LoginForm from '../components/components/Login';
import useAuth from '../shared/hooks/useAuth';
import '../stylesPages/LoginRegister.css';

export default function Login() {
  const { signIn } = useAuth();
  return <LoginForm onSubmit={signIn}></LoginForm>;
}
