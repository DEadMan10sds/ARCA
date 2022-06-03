import axios from 'axios';
import {Formik, Form, Field} from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import styles from '../styles/profile.module.css';
import {AuthContext} from '../helpers/AuthContext';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const {authState} = useContext(AuthContext);
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    birth: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/users/${authState.id}`, 
    {
      headers: {
        accesstoken: localStorage.getItem('accessToken')
      }
    }
    ).then((response) => {
      setUserData(response.data);
    });
  }, []);

  const CerrarSesion = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  }

  return (
    <div className={styles.ProfileContainer}>
        <div className={styles.ProfilePhoto}>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-circle" width="300" height="300" viewBox="0 0 24 24" strokeWidth=".2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="10" r="3" />
            <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
          </svg>
        </div>
        <div className={styles.FormContainer}>
          <Formik>
            <Form className={styles.Form}>
              <div className={styles.fieldContainer}>
                <label>Nombre(s):</label>
                <Field className={styles.Field} value={userData.name} disabled/>
              </div>
              <div className={styles.fieldContainer}>
                <label>Apellido(s):</label>
                <Field className={styles.Field} value={userData.surname} disabled/>
              </div>
              <div className={styles.fieldContainer}>
                <label>Correo:</label>
                <Field className={styles.Field} value={userData.email} disabled/>
              </div>
              <div className={styles.fieldContainer}>
                <label>Teléfono:</label>
                <Field className={styles.Field} value={userData.phoneNumber} disabled/>
              </div>
              <div className={styles.fieldContainer}>
               <label>Fecha de nacimiento:</label>
                <Field className={styles.Field} value={(userData.birth ? (userData.birth) : (""))} disabled/>
              </div>
            </Form>
          </Formik>
        </div>
        <div className={styles.buttonContainer}>
          <Button onClick={CerrarSesion} variant="warning">Cerrar sesión</Button>
        </div>
    </div>
  )
}

export default Profile