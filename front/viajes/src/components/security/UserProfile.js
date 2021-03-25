import useAuth from '../../shared/hooks/useAuth';
import { Redirect } from 'react-router-dom';
export default function UserNotLogged({ children }) {
  const { userData } = useAuth();
  const id = Number(window.location.pathname.split('/')[2]);
  return <>{userData?.id === id ? children : <Redirect to="/"></Redirect>}</>;
}
