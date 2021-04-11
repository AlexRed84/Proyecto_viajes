import { getListEntries } from '../http/api2';
import React, { useEffect, useState } from 'react';
import '../stylesPages/Rutas.css';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getListEntries().then((data) => setData(data));
  }, []);

  return (
    <>
      <div className="cajarutas">
        {data &&
          data.data.map((item) => {
            return (
              <>
                <div className="caja" key={data.id}>
                  <h1 className="h1place">{item.place}</h1>

                  <h1 className="h1caja">{item.description}</h1>
                  {item.photos.length > 0 ? (
                    <img src={`http://localhost:3000/uploads/${item.photos[0].photo}`} alt={item.place} />
                  ) : null}
                  {/* <h2 className="h2caja">{item.votes}</h2> */}
                  <h5 className="h5caja">{item.date} </h5>
                  <div class="ec-stars-wrapper">
                    <a href="#" data-value="1" title="Votar con 1 estrellas">
                      &#9733;
                    </a>
                    <a href="#" data-value="2" title="Votar con 2 estrellas">
                      &#9733;
                    </a>
                    <a href="#" data-value="3" title="Votar con 3 estrellas">
                      &#9733;
                    </a>
                    <a href="#" data-value="4" title="Votar con 4 estrellas">
                      &#9733;
                    </a>
                    <a href="#" data-value="5" title="Votar con 5 estrellas">
                      &#9733;
                    </a>
                  </div>
                  <noscript>Necesitas tener habilitado javascript para poder votar</noscript>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default App;
