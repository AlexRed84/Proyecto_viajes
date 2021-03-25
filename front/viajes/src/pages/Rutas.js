// import React from 'react';
// import '../stylesPages/Rutas.css';

// export default function Rutas() {
//     return <h1 className='rutas()'>RUTAS</h1>;

//     }
    
import {getListEntries} from '../http/api2';
import React, { useEffect, useState } from 'react';

const App = () => {
const [data, setData] = useState(null)


useEffect(() => {
    
    getListEntries().then((data) => setData(data))
}, [])

return (
    <div>
    {data && data.data.map((item) => 
        <ul>
        <li>{item.place}</li>
        </ul>
    )}
    </div>
)
}

export default App;