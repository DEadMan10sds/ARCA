import React from 'react';
import styles from '../styles/donations.module.css';

function Donations() {
  return (
    <div className={styles.container}>
        <a><i className={`fa fa-paypal ${styles.icon}`}/></a>
    </div>
  )
}

export default Donations