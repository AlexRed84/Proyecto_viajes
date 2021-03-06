import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import profile from '../../svg/profile-user.svg';
import { Link } from 'react-router-dom';
import useAuth from '../../shared/hooks/useAuth';
import { getUserInfo } from '../../http/api2';
export default function Profile(props) {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [statusMessage, setstatusMessage] = useState('');
  const [profileData, setProfileData] = useState(null);
  const { userData } = useAuth();
  const onDelete = async () => {};
  useEffect(() => {
    getUserInfo(userData?.id).then((data) => {
      setProfileData(data);
    });
    console.log(String.fromCharCode.apply(null, profileData?.data?.photo?.data));
  }, [userData]);

  const onSubmit = async (data) => {
    try {
      const serverResponse = await props.onSubmit(data);
      if (errorMessage.length > 0) {
        setErrorMessage('');
      }
      if (serverResponse.status === 200) {
        setstatusMessage('');
        setErrorMessage('');
        setstatusMessage('Información actualizada con exito');
      }
      if (serverResponse.status !== 200) {
        setErrorMessage('Ha habido un error, es posible que falten campos');
      }
    } catch (error) {
      setstatusMessage('');
      setErrorMessage('');
      setErrorMessage('error');
    }
  };

  return (
    <div className="backgroundProfile">
      <div className="recuadroProfile">
        <div className="panel">
          <Link>
            <p className="selected opcion">Información personal</p>
          </Link>
          <Link to={`/newRoute`}>
            <p className="opcion">Añadir Ruta</p>
          </Link>

          <Link to={`/Rutas`}>
            <p className="opcion">Rutas Publicadas</p>
          </Link>
        </div>
        <div className="infoPanel">
          <div className="dropdown alineado">
            <p className=" op2">☰</p>
            <div className="dropdown-content">
              <Link to={`/users/${userData?.id}`}>Información personal</Link>
              <Link to={`/entries/${userData?.id}`}>Añadir Ruta</Link>
              <Link Link to={`/entries/${userData?.id}/users`}>
                Rutas publicadas
              </Link>
            </div>
          </div>
          <div className="infoUser">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1>Información Personal</h1>
              {!profileData?.data?.photo && <img src={profile} className="profile" alt="website logo" />}
              {profileData?.data?.photo && (
                <img
                  src={`http://localhost:3000/static/uploads/${String.fromCharCode.apply(
                    null,
                    profileData?.data?.photo?.data
                  )}`}
                  alt=""
                  className="profilePhoto"
                ></img>
              )}

              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                placeholder="Introduzca el nombre"
                defaultValue={profileData?.data?.name}
                ref={register({ required: true })}
              />
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                defaultValue={profileData?.data?.email}
                placeholder="Introduzca el email"
                ref={register({ required: true })}
              />
              <label htmlFor="bio">Descripción</label>
              <textarea
                htmlFor="textarea"
                rows="10"
                cols="40"
                id="bio"
                defaultValue={profileData?.data?.bio}
                name="bio"
                placeholder="Escriba un comentario..."
                ref={register()}
              ></textarea>
              <input className="fotoInput" type="file" name="foto" id="foto" ref={register()} />
              <input className="botonLogin" type="submit" value="Actualizar Información" />
              <hr></hr>
              <h4 className="registrado" onClick={onDelete}>
                Borrar cuenta
              </h4>
              {statusMessage.length > 0 && <p className="status-ok">{statusMessage}</p>}
              {errorMessage.length > 0 && <p className="error">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
