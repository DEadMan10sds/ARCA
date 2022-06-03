import React, {useState} from 'react'
import {Navigate, useNavigate} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import styles from './Accordion.module.css'
import axios from 'axios';
import * as Yup from 'yup';

import Button from '../Button';

function Accordion({eventData}) {
    const navigate = useNavigate();    
    const [isOpen, setIsOpen] = useState(false);
    //if(eventData.name === "") setIsOpen(true);
    const [event, setEvent] = useState({
        name: eventData.name,
        price: eventData.price,
        quota: eventData.quota,
        date: eventData.date,
        payDate: eventData.payDate,
        description: eventData.description,
    });

    const initialValues = {
        name: eventData.name,
        price: eventData.price,
        quota: eventData.quota,
        date: eventData.date,
        payDate: eventData.payDate,
        description: eventData.description,
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("El nombre es obligatorio"),
        price: Yup.number().required("El precio es obligatorio"),
        quota: Yup.number().integer().min(1).required("El cupo es obligatorio"),
        date: Yup.string().required("El día es obligatorio"),
        payDate: Yup.string().required("La fecha limite de pago es obligatoria"),
        description: Yup.string().required("La descripcion es obligatoria"),
    });

    const onSubmit = (data) => {
       if(eventData.name === '' && eventData.description == '') {
            axios.post("http://localhost:3001/events", {
                name: data.name,
                description: data.description,
                price: data.price,
                quota: data.quota,
                restantQuota: data.quota,
                active: true,
                date: data.date,
                payDate: data.payDate,
                image: null
            }, {
                headers: {
                    accessToken: localStorage.getItem('accessToken')
                }
            }).then((response) => {
                setIsOpen(false);
                navigate('/Dashboard');
            });
            navigate('/Dashboard');
        }
        else
        {
            axios.put(`http://localhost:3001/events/${eventData.id}`, data, {
                headers: {
                    accessToken: localStorage.getItem('accessToken')
                }
            }).then(() => {
            setEvent({
                name: data.name,
                price: data.price,
                quota: data.quota,
                date: data.date,
                payDate: data.payDate,
                description: data.description,
            });
            setIsOpen(false);
            navigate('/Dashboard');
        });
        }
    };

    const deleteEvent = () => {
        const verification = prompt("Ingese el nombre del evento para eliminarlo");
        if(verification === event.name)
        {
            axios.delete(`http://localhost:3001/events/${eventData.id}`, {
                headers: {
                    accessToken: localStorage.getItem('accessToken')
                }
            }).then(() => {
                navigate('/Dashboard');
            });
            navigate('/Dashboard');
        }
    }

  return (
    <div className={styles.row}>
        <div className={styles.title}>
            {event.name}
        </div>
        <div className={styles.icons}>
            <button className={styles.edit} onClick={()=> {setIsOpen(!isOpen)}}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                    <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                    <line x1="16" y1="5" x2="19" y2="8" />
                </svg>
            </button>
            <button className={styles.trash} onClick={deleteEvent}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
            </button>
        </div>
        {isOpen && 
            <div className={styles.content}> 
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form className={styles.form}>
                        <aside>
                            <div className={styles.image}>
                            </div>
                            <div className={styles.inputContainer}>
                                <label className={styles.inputLabel}>Fecha del evento: </label>
                                <ErrorMessage name="date" component="span"/>
                                <Field type="text" name="date" id="Date" placeholder={event.date} className={styles.input}/>
                            </div>
                            <div className={styles.inputContainer}>
                                <label className={styles.inputLabel}>Límite de pago: </label>
                                <ErrorMessage name="payDate" component="span"/>
                                <Field type="text" name="payDate" id="payDate" placeholder={event.payDate} className={styles.input}/>
                            </div>
                        </aside>
                        <div>
                            <div className={styles.inputContainer}>
                                <label className={styles.inputLabel}>Nombre del evento: </label>
                                <ErrorMessage name="name" component="span"/>
                                <Field type="text" name="name" id="Name" placeholder={event.name} className={styles.input}/>
                            </div>
                            <div className={styles.inputContainer}>
                                <label className={styles.inputLabel}>Cupo máximo: </label>
                                <ErrorMessage name="quota" component="span"/>
                                <Field type="number" name="quota" id="quota" placeholder={event.quota} className={styles.input} min="0"/>
                            </div>
                            <div className={styles.inputContainer}>
                                <label className={styles.inputLabel}>Precio: </label>
                                <ErrorMessage name="price" component="span"/>
                                <Field type="number" name="price" id="price" placeholder={event.price} className={styles.input} min="0.00"/>
                            </div>
                            <div className={styles.inputContainer}>
                                <label className={styles.inputLabel}>Descripción: (Máx 100 caracteres) <br></br></label>
                                <ErrorMessage name="description" component="span"/>
                                <Field as="textarea" maxLength="200" name="description" id="Description" placeholder={event.description} className={styles.description} />
                            </div>
                            <div className={styles.buttonContainer}>
                                <Button variant='warning' onClick={()=>{setIsOpen(false);}} ><span>Cancelar</span></Button>
                                <Button variant='primary' onClick={()=> {}} type="submit"><span>Aceptar</span></Button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        }
    </div>
  )
}

export default Accordion