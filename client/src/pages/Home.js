import axios from 'axios';
import {useEffect, useState} from 'react';
import style from '../styles/home.module.css';

function Home() {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/events").then((response) => {
      setEvent(response.data);
    });

  }, []);

  return (
    <div>
    {
      event.map((value, key) => {
        return (
          <div key={key} className={style.eventCard}>
            <div className="eventCard-title">{value.name}</div>
            <div className="eventCard-description">{value.description}</div>
          </div>
        )
      })
    }
    </div>
  )
}

export default Home