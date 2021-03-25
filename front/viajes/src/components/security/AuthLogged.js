import useAuth from '../../shared/hooks/useAuth';
import { Redirect } from 'react-router-dom';
export default function UserNotLogged({ children }) {
  const { isUserLogged } = useAuth();

  return <>{!isUserLogged ? children : <Redirect to="/"></Redirect>}</>;
}
