import { useForm } from 'react-hook-form';
import { useState } from 'react';
import profile from '../../svg/profile-user.svg';
import { Link } from 'react-router-dom';
export default function LoginForm(props) {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [statusMessage, setstatusMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const serverResponse = await props.onSubmit(data.email, data.password, data.confirmPassword, data.cbox1);
      if (errorMessage.length > 0) {
        setErrorMessage('');
      }
      if (serverResponse.message) {
        setstatusMessage(serverResponse.message);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div className="background">
      <div className="recuadro">
        <div className="login">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Inicio de sesión</h1>
            <a target="_blank" rel="noopener noreferrer" href="/login">
              <img src={profile} className="profile" alt="website logo" />
            </a>
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
            <label htmlFor="confirmPassword">Confirma la contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirme la contraseña"
              ref={register({ required: true, minLength: 8 })}
            ></input>
            <label className="radio" htmlFor="cbox1">
              <input className="radio2" name="cbox1" type="checkbox" id="cbox1" ref={register()} />
              Recordar contraseña
            </label>
            <input className="botonLogin" type="submit" />
            <hr></hr>
            <Link className="forgot" to="/recover">
              ¿Ha olvidado la contraseña?
            </Link>
            <Link className="forgot" to="/register">
              Darse de alta como usuario
            </Link>
            {statusMessage.length > 0 && <p className="status-ok">{statusMessage}</p>}
            {errorMessage.length > 0 && <p className="error">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
