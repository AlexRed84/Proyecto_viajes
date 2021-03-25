import useAuth from '../../shared/hooks/useAuth';

export default function UserLogged({ children }) {
  const { isUserLogged } = useAuth();

  return <>{isUserLogged ? children : null}</>;
}
