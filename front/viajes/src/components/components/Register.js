import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import profile from '../../svg/profile-user.svg';

export default function Register(props) {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [statusMessage, setstatusMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const serverResponse = await props.onSubmit(data.email, data.password);
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
            <h1 className>Registrarse</h1>
            <a target="_blank" rel="noopener noreferrer" href="/register">
              <img src={profile} className="profile" alt="website logo" />
            </a>
            <label htmlFor="name">Nombre</label>
            <input id="name" name="name" placeholder="Introduzca el nombre" ref={register({ required: true })} /> 
            <label htmlFor="email">Email</label>
            <input id="email" name="email" placeholder="Introduzca el email" ref={register({ required: true })} />
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Introduzca la contraseña"
              ref={register({ required: true, minLength: 8 })}
            />
          
            <input className="botonLogin" type="submit" />
            <hr></hr>
            <Link className="registrado" to="/login">
              ¿Ya está registrado?
            </Link>
            {statusMessage.length > 0 && <p className="status-ok">{statusMessage}</p>}
            {errorMessage.length > 0 && <p className="error">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
