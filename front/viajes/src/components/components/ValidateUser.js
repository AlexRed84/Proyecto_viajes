import { useState, useEffect } from 'react';
import { validateUser } from '../../http/api2';
export default function ValidateUser() {
  function useFetch() {
    const [data, setData] = useState([]);
    async function getData() {
      try {
        const message = await validateUser(window.location.pathname.split('/')[3]);
        setData(message.message);
      } catch (error) {
        setData(error);
      }
    }

    useEffect(() => {
      getData();
    }, []);
    return (
      <>
        {' '}
        <p className="data">{data}</p>
      </>
    );
  }
  return (
    <div className="backgroundProfile">
      <div className="recuadroProfile">{useFetch()}</div>
    </div>
  );
}
