import React, {useState, useEffect} from 'react'
import styles from '../styles/dashboard.module.css';
import axios from 'axios';
import Button from '../components/Button';
import Accordion from '../components/Accordion';


function Dashboard() {
    const [event, setEvent] = useState([]);
    const [newEvent, setNewEvent] = useState({
        name: '',
        description: '',
        price: '',
        quota: '',
        date: '',
        payDate: '',
    });

    useEffect(() => {
      axios.get("http://localhost:3001/events").then((response) => {
        setEvent(response.data);
      });
  
    }, []);

    const addEvent = () => 
    {
        //event.unshift(newEvent);
        setEvent([newEvent, ...event]);
    }


  return (
    <div className={styles.container}>
        <div className={styles.tools}>
            <div className={styles.buttonContainer}>
                <Button onClick={addEvent} variant='add'>
                    Nuevo
                    <div className={styles.addEvent}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-plus" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <circle cx="12" cy="12" r="9" />
                            <line x1="9" y1="12" x2="15" y2="12" />
                            <line x1="12" y1="9" x2="12" y2="15" />
                        </svg>
                    </div>
                </Button>
            </div>
        </div>
        {
            event.map(eventAccordion => {
                return (<Accordion key={eventAccordion.id} eventData={eventAccordion}/>);
            })
        }
    </div>
  )
}

export default Dashboard