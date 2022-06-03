import React, {useContext} from 'react'
import styles from './Navbar.module.css';
import {AuthContext} from '../../helpers/AuthContext';

function Navbar() {
    const {authState} = useContext(AuthContext);
  return (
    <>
        <div className={styles.container}>
            <div className={styles.logo}>
                <a className={styles.home} href='/' >ARCA</a>
            </div>
            <div className={styles.options}>
                {
                    (authState.Status ? (
                        <a href={`Profile/${authState.id}`}>Perfil</a>
                    ): (
                        <a href='/Login'>Perfil</a>
                    )
                )}
                <a href='/'>Eventos</a>
                <a href='/'>Cursos</a>
                {
                    (authState.Status ? (
                        <a href='/'>Pagos</a>
                    ): (
                        <a href='/Login'>Pagos</a>
                    )
                )}
                <a className={styles.cart} href='/'>
                    <svg xmlns="http://www.w3.org/2000/svg" id={styles.cartStyled} className="icon icon-tabler icon-tabler-shopping-cart " width="35" height="35" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="6" cy="19" r="2" />
                        <circle cx="17" cy="19" r="2" />
                        <path d="M17 17h-11v-14h-2" />
                        <path d="M6 5l14 1l-1 7h-13" />
                    </svg>
                </a>
            </div>
        </div>
    </>
  );
}

export default Navbar