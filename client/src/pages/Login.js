import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../styles/register.module.css';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import Button from '../components/Button';
import * as Yup from 'yup';
import axios from 'axios';
import {useContext} from 'react';
import {AuthContext} from '../helpers/AuthContext';

function Register() {
    const {setAuthState} = useContext(AuthContext);
    const navigate = useNavigate();
    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Ingresa un correo válido").required("El correo es obligatorio"),
        password: Yup.string().required("La contraseña es obligatoria")
    });

    const onSubmit = (data) => {
        axios.post('http://localhost:3001/users/login', data).then((response) => {
            if(response.data.error) alert(response.data.error);
            else
            {
                localStorage.setItem('accessToken', response.data.token);
                console.log(response.data);
                setAuthState({
                    id: response.data.id,
                    name: response.data.name,
                    surname: response.data.surname,
                    email: response.data.email,
                    role: response.data.role,
                    status: true
                });
                navigate('/');
            }
        });
    };

  return (
    <div className={styles.container}>
    <h1 className={styles.title}>Registrarse</h1>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className={styles.formLogin}>
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel}>Correo: </label>
                    <ErrorMessage name="email" component="span"/>
                    <Field type="text" name="email" id="loginEmail" placeholder="correo@correo.com" className={styles.input}/>
                </div>
                
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel}>Contraseña: </label>
                    <ErrorMessage name="password" component="span"/>
                    <Field type="password" name="password" id="loginPassword" placeholder="Contraseña" className={styles.input}/>
                </div>
                <div className={styles.buttonContainer}>
                    <Button variant='primary' onClick={()=>{}} type='submit'>Iniciar Sesión</Button>
                </div>
                <div className={styles.login}>
                    <h2>No tienes cuenta?</h2>
                    <a className={styles.aLogin} href='/Register'>Registrarse</a>
                </div>
            </Form>
        </Formik>
    </div>
  )
}

export default Register