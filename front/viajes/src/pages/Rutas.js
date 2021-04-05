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
    <div>
    {data && data.data.map((item) => 
        <ul>
        <li>{item.place} {item.date} {item.votes} {item.description}</li>
        </ul>
    )}
    </div>
    </>
)
}

export default App;