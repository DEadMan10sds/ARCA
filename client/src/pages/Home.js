import axios from 'axios';
import {useEffect, useState, useContext} from 'react';
import Button from '../components/Button';
import styles from '../styles/home.module.css';
import {AuthContext} from '../helpers/AuthContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [event, setEvent] = useState([]);
  const {authState, setAuthState} = useContext(AuthContext);
  const [ticket, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/events").then((response) => {
      setEvent(response.data);
    });

  }, []);

  const onChange = ({target: {value}}) => {
    setTickets(parseInt(value));
  }

  const buyTickets = (currentEvent) => {
    console.log("Event: ", currentEvent.id);
    console.log("Tickets: ", ticket);
    setAuthState(...authState, {
      eventID: [...authState.eventID, currentEvent.id],
    })
    console.log(authState.eventID);
    console.log(authState.ticketAmount);
  }

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
                    <div className={styles.quote}>Cupo actual: {value.restantQuota}</div>
                    <div className={styles.quote}>Precio: ${value.price}.00</div>
                    <div className={styles.quote}>Fecha del evento: {value.date}</div>
                    <div className={styles.quote}>Fecha límite de pago: {value.payDate}</div>
                    {authState.role === 'user' && (
                      <>
                        <div className={styles.ticketSelector}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-minus" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <circle cx="12" cy="12" r="9" />
                            <line x1="9" y1="12" x2="15" y2="12" />
                          </svg>
                          <div className={styles.ticket}>
                            <input className={styles.ticketInput} type="number" min="1" max={value.restantQuota} placeholder="1" name='ticket' onChange={onChange}/>
                          </div>
                          <svg  xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-plus" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <circle cx="12" cy="12" r="9" />
                            <line x1="9" y1="12" x2="15" y2="12" />
                            <line x1="12" y1="9" x2="12" y2="15" />
                          </svg>
                        </div>
                        <div className={styles.buttonContainer}>
                          <Button variant='primary' onClick={()=>{buyTickets(value); }}><span>Comprar</span></Button>
                        </div>
                      </>
                    )}
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