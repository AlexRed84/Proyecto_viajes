import {getListEntries} from '../http/api2';
import React, { useEffect, useState } from 'react';
import '../stylesPages/Rutas.css';

const App = () => {
const [data, setData] = useState (null);


useEffect(() => {
    
    getListEntries().then((data) => setData(data))
}, [])

return (
    
    <>
    
    <div className='backgroundRutas'/>
   

    {data && data.data.map((item) => 
        <div className='caja'>
        {item.place} {item.date} {item.votes} {item.description}
        </div>
    )}
    
    </>
)
}

export default App;