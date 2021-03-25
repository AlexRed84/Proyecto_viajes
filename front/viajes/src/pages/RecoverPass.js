import Recover from '../components/components/RecoverPass';
import useAuth from '../shared/hooks/useAuth';
import '../stylesPages/LoginRegister.css';

export default function RecoverPass() {
  const { recoverPass } = useAuth();
  return <Recover onSubmit={recoverPass}></Recover>;
}
