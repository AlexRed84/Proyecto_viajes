import { useForm } from 'react-hook-form';
import BackgroundVideo from './BackgroundVideo';

export default function AuthForm(props) {
const { handleSubmit } = useForm();

const onSubmit = async (data) => {
window.alert("Consulta Enviada");

};
  return (
    
    <div>
    
      <div>
      <BackgroundVideo />
    
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
                <input className="boton" type="submit"   />
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
