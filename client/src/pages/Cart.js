import React from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {AuthContext} from '../helpers/AuthContext';
import styles from '../styles/cart.module.css';


function Cart() {
  const {authState} = useContext(AuthContext);
  console.log(authState.eventID);
  return (
    <div className={styles.container}>
        <div className={styles.rowTitle}>
            <div className={styles.Title}>Evento</div>
            <div className={styles.Title}>Cantidad</div>
            <div className={styles.Title}>Precio</div>
            <div className={styles.Title}>Borrar</div>
        </div>
        {authState.eventID.map((value, key) => {
          return (console.log("A:", value));
        })}
    </div>
  )
}

export default Cart