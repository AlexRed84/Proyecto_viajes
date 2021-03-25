import { Link } from 'react-router-dom';
import useAuth from '../../shared/hooks/useAuth';
import UserLogged from '../security/LogedUser';
import UserNotLogged from '../security/NotUserLogged';

export default function Header() {
  const { signOut } = useAuth();
  const { userData } = useAuth();
  let profile;
  if (userData) {
    profile = `/profile/${userData.id}`;
  }
  return (
    <nav>
      <Link to="/" className="links logo">
      Roling Road
      </Link>
      <div className="rightSection">
        <Link to="/" className="links">
          Inicio
        </Link>
        <Link to="/Rutas" className="links">
          Rutas
        </Link>
        <UserLogged>
          <Link to={profile} className="links">
            Perfil
          </Link>
          <Link className="links" to="/" onClick={signOut}>
            Cerrar Sesión
          </Link>
        </UserLogged>
        <UserNotLogged>
          <Link to="/register" className="links">
            Registrarse
          </Link>
          <Link to="/login" className="links">
            Iniciar sesión
          </Link>
        </UserNotLogged>
      </div>
      <div className="dropdown alineado">
        <p className=" op">☰</p>
        <div className="dropdown-content">
          <Link to="/">Inicio</Link>
          <Link to="/Rutas">Rutas</Link>
          <UserLogged>
            <Link to={profile}>Perfil</Link>
            <Link className="links" to="/" onClick={signOut}>
              Cerrar Sesión
            </Link>
          </UserLogged>
          <UserNotLogged>
            <Link to="/register">Registrarse</Link>
            <Link to="/login">Iniciar sesión</Link>
          </UserNotLogged>
        </div>
      </div>
    </nav>
  );
}
