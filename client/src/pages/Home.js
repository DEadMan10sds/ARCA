import axios from 'axios';
import {useEffect, useState} from 'react';
import styles from '../styles/home.module.css';

function Home() {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/events").then((response) => {
      setEvent(response.data);
      console.log(response.data);
    });

  }, []);

  return (
    <div className={styles.container}>
    {
      event.map((value, key) => {
        return (
          <div key={key} className={styles.eventCard}>
            <div className={styles.image} />
            <div className={styles.data}>
                <div className={styles.title}>{value.name}</div>
                <label className={styles.descriptionLabel}>Descripcion</label>
                <div className={styles.description}>{value.description}</div>
                <div className={styles.restrictions}>
                    <div className={styles.quote}>Cupo Máximo: {value.quota}</div>
                    <div className={styles.quote}>Precio: ${value.price}.00</div>
                    <div className={styles.quote}>Fecha del evento: {value.date}</div>
                    <div className={styles.quote}>Fecha límite de pago: {value.payDate}</div>
                </div>
            </div>
          </div>
        )
      })
    }
    </div>
  )
}

export default Home