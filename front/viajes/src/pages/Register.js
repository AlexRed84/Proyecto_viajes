import RegisterForm from '../components/components/Register';
import useAuth from '../shared/hooks/useAuth';

import '../stylesPages/LoginRegister.css';

export default function Register() {
  const { signUp } = useAuth();
  return <RegisterForm onSubmit={signUp}></RegisterForm>;
}
