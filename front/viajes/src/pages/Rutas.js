import { getListEntries } from '../http/api2';
import React, { useEffect, useState } from 'react';
import '../stylesPages/Rutas.css';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getListEntries().then((data) => setData(data));
  }, []);

  console.log(data);

  return (
    <>
      <div className="cajarutas">
        {data &&
          data.data.map((item) => {
            return (
              <>
                <div className="caja" key={data.id}>
                  {item.place} {item.date} {item.votes} {item.description}
                  {item.photos.length > 0 ? (
                    <img src={`http://localhost:3000/uploads/${item.photos[0].photo}`} alt={item.place} />
                  ) : null}
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default App;
