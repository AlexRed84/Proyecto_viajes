import Reset from '../components/components/ResetPass';
import useAuth from '../shared/hooks/useAuth';
import '../stylesPages/LoginRegister.css';

export default function ResetPass() {
  const { resetPassword } = useAuth();
  return <Reset onSubmit={resetPassword}></Reset>;
}
