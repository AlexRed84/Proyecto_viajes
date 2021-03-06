// import { newRoute } from '../http/api2';
// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
import '../stylesPages/newRoute.css';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

const apiUrl = 'http://localhost:3000';

export default function NewRoute(data) {
  const { register, handleSubmit, errors } = useForm();
  // const [errorMessage, setErrorMessage] = useState();

  const token = localStorage.getItem('token');

  const headers = new Headers();
  if (token) {
    // headers.append('Content-Type', 'multipart/form-data');
    headers.append('Authorization', token);
    //headers.append('content-type': 'multipart/form-data');
  }

  // const body = new FormData();

  // body.append('place', data.place);
  // body.append('description', data.description);
  // body.append('photo', data.photo);

  const onSubmit = async (data) => {
    console.log('Data ', data);
    const formdata = new FormData();

    formdata.append('photo', data.photo[0]);
    formdata.append('place', data.place);
    formdata.append('description', data.description);

    // fetch('http://localhost:8000/upload', {
    //   method: 'POST',
    //   body: data,
    // }).then((response) => {
    //   response.json().then((body) => {
    //     this.setState({ imageURL: `http://localhost:8000/${body.file}` });
    //   });
    // });
    try {
      await fetch(`${apiUrl}/entries`, {
        method: 'POST',
        body: formdata,
        headers: headers,
      });
    } catch (error) {
      // setErrorMessage(error.message);
      console.log(error);
    }
  };
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
                      <h1 className="h1info">A??adir Nueva Ruta</h1>
                      <label htmlFor="place">Lugar</label>
                      <br></br>
                      <input id="place" name="place" placeholder="Ubicacion" ref={register} />
                      <br></br>
                      <br></br>
                      <label htmlFor="description">Descripci??n</label>
                      <textarea
                        htmlFor="textarea"
                        rows="10"
                        cols="30"
                        id="description"
                        name="description"
                        placeholder="Descripci??n"
                        ref={register}
                      ></textarea>
                      <label className="inputfile" htmlFor="photo">
                        A??adir Foto
                      </label>
                      <input className="inputfile" type="file" id="photo" name="photo" ref={register} />
                      <br></br>
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
}
