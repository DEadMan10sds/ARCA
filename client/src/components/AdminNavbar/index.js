import React, { useContext } from 'react'
import styles from './AdminNavbar.module.css';
import {AuthContext} from '../../helpers/AuthContext';

function AdminNavbar() {
  const {authState} = useContext(AuthContext);
  return (
    <>
        <div className={styles.container}>
            <div className={styles.logo}>
                <a className={styles.home} href='/' >ARCA</a>
            </div>
            <div className={styles.options}>
                <a href={`/Profile/${authState.id}`}>Perfil</a>
                <a href='/Dashboard'>Panel de control</a>
                <a href='/'>Listas</a>
            </div>
        </div>
    </>
  );
};

export default AdminNavbar;