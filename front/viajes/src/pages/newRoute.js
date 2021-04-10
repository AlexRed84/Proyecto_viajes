import { newRoute } from '../http/api2';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../stylesPages/newRoute.css';

const NewRoute = () => {
  const [data, setData] = useState(null);
  const { handleSubmit } = useForm();

  useEffect(() => {
    newRoute().then((data) => setData(data));
  }, []);
  const onSubmit = async (data) => {};

  return (
    <>
      <div className="backgroundnewroute">
        <div className="recuadronewroute">
          <div>
            <div>
              <div className="formularionewroute">
                <div className="formularionewroute-square">
                  <div className="squarenewroute">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <label htmlFor="place">Lugar</label>
                      <input id="place" name="place" placeholder="Ubicaciòn" />
                      <label htmlFor="bio">Descripción</label>
                      <textarea
                        htmlFor="textarea"
                        rows="10"
                        cols="40"
                        id="description"
                        defaultValue={data}
                        name="bio"
                        placeholder="Descripción"
                        ref={newRoute()}
                      ></textarea>
                      <label htmlFor="photo">Foto</label>
                      <input className="fotoInput" type="file" name="foto" id="foto" ref={useForm()} />
                      <input className="boton" type="submit" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewRoute;
