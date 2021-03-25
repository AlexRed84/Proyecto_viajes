import { useForm } from 'react-hook-form';
import BackgroundVideo from './BackgroundVideo';

export default function AuthForm(props) {
  const { handleSubmit } = useForm();

  const onSubmit = async (data) => {};
  return (
    <div>
      <div>
      <BackgroundVideo />
        {/* <div className="back">
          <div className="info">
            <h1>Roling Road</h1>
            <h2>...Rodando con los Sueños</h2>
          </div>
        </div> */}
        <div className="formulario">
          <div className="formulario-square">
            <div className="square">
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">Nombre</label>
                <input id="name" name="name" placeholder="Introduzca su nombre" />
                <label htmlFor="email">Email</label>
                <input id="email" name="email" placeholder="Escriba su email" />
                <label htmlFor="mensaje">Mensaje</label>
                <textarea htmlFor="textarea" rows="10" cols="40" placeholder="Escriba un comentario..."></textarea>
                <input className="boton" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
