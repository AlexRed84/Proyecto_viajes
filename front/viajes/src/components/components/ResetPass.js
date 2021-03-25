import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import profile from '../../svg/profile-user.svg';
export default function Reset(props) {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [statusMessage, setstatusMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      //como pasar checkbox
      const serverResponse = await props.onSubmit(data.token, data.password, data.confirmPassword);
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
            <label htmlFor="token">Código de recuperación</label>
            <input
              id="token"
              name="token"
              placeholder="Introduzca el código de recuperación"
              ref={register({ required: true })}
            />
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Introduzca la contraseña"
              ref={register({ required: true, minLength: 8 })}
            />
            <label htmlFor="confirmPassword">Confirma la contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirme la contraseña"
              ref={register({ required: true, minLength: 8 })}
            ></input>
            <input className="botonLogin" type="submit" />
            <hr></hr>
            <Link className="forgot" to="/login">
              Volver al inicio de sesión
            </Link>
            {statusMessage.length > 0 && <p className="status-ok">{statusMessage}</p>}
            {errorMessage.length > 0 && <p className="error">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
