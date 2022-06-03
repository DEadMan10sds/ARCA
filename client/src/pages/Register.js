import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../styles/register.module.css';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import Button from '../components/Button';
import * as Yup from 'yup';
import 'yup-phone';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        surname: '',
        email: '',
        phone:'',
        password: '',
        passwordConfirmed: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("El nombre es obligatorio"),
        surname: Yup.string().required("El apellido es obligatorio"),
        email: Yup.string().email("Ingresa un correo válido").required("El correo es obligatorio"),
        phone: Yup.string().phone().required("El teléfono es obligatorio"),
        password: Yup.string().required("La contraseña es obligatoria"),
        passwordConfirmed: Yup.string().required("La confirmación de la contraseña es obligatoria")
    });

    const onSubmit = (data) => {
        if(data.password === data.passwordConfirmed){
            const userData = {
                name: data.name,
                surname: data.surname,
                email: data.email,
                phone: data.phone,
                password: data.password
            };
            axios.post('http://localhost:3001/users', userData).then(() => {
                console.log(userData);
                navigate('/Login');
            });
        }
        else alert("Las contraseñas no coinciden");        
    };

    const aux = () => {
        console.log('hola');
    };

  return (
    <div className={styles.container}>
    <h1 className={styles.title}>Registrarse</h1>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className={styles.form}>
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel}>Nombre(s): </label>
                    <ErrorMessage name="name" component="span"/>
                    <Field type="text" name="name" id="Name" placeholder="Adán" className={styles.input}/>
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel}>Apellido(s): </label>
                    <ErrorMessage name="surname" component="span"/>
                    <Field type="text" name="surname" id="Surname" placeholder="Sánchez" className={styles.input}/>
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel}>Correo: </label>
                    <ErrorMessage name="email" component="span"/>
                    <Field type="text" name="email" id="Email" placeholder="correo@correo.com" className={styles.input}/>
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel}>Telefono: </label>
                    <ErrorMessage name="phone" component="span"/>
                    <Field type="tel" name="phone" id="Phone" placeholder="4445163348" className={styles.input}/>
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel}>Contraseña: </label>
                    <ErrorMessage name="password" component="span"/>
                    <Field type="password" name="password" id="Password" placeholder="Contraseña" className={styles.input}/>
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel}>Confirmar contraseña: </label>
                    <ErrorMessage name="passwordConfirmed" component="span"/>
                    <Field type="password" name="passwordConfirmed" id="PasswordConfirm" placeholder="Contraseña" className={styles.input}/>
                </div>
                <div className={styles.buttonContainer}>
                    <Button variant='primary' onClick={aux} type="submit">Registrarse</Button>
                </div>
                <div className={styles.login}>
                    <h2>Ya tienes cuenta?</h2>
                    <a className={styles.aLogin} href='/Login'>Iniciar Sesión</a>
                </div>
                </Form>
        </Formik>
    </div>
  )
}

export default Register