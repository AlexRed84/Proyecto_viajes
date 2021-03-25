import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import profile from '../../svg/profile-user.svg';
export default function Recover(props) {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [statusMessage, setstatusMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      //como pasar checkbox
      const serverResponse = await props.onSubmit(data.email, data.password, data.confirmPassword);
      if (errorMessage.length > 0) {
        setErrorMessage('');
      }
      if (serverResponse.message) {
        setstatusMessage(serverResponse.message);
      }
    } catch (error) {
      setstatusMessage('');
      setErrorMessage(error);
    }
  };

  return (
    <div className="background">
      <div className="recuadro">
        <div className="login">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Recuperar contraseña</h1>
            <a target="_blank" rel="noopener noreferrer" href="/login">
              <img src={profile} className="profile" alt="website logo" />
            </a>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" placeholder="Introduzca el email" ref={register({ required: true })} />
            <input className="botonLogin" type="submit" />
            <hr></hr>
            <Link className="forgot" to="/login">
              Volver al inicio de sesión
            </Link>
            <Link className="forgot" to="/reset">
              Ya tengo un código de recuperación
            </Link>
            {statusMessage.length > 0 && <p className="status-ok">{statusMessage}</p>}
            {errorMessage.length > 0 && <p className="error">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
