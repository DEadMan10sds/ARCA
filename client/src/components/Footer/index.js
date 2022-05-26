import React from 'react'
import styles from './Footer.module.css';

function Footer() {
  return (
    <>
        <footer className={styles.container}>
            <div className={styles.logo}>
                <a className={styles.home} href='/' >ARCA</a>
            </div>
            <div className={styles.links}>
                <ul>
                    <li><a className={styles.footerLinks} href='/'>Quienes somos</a></li>
                    <li><a className={styles.footerLinks} href='/'>Donaciones</a></li>
                    <li><a className={styles.footerLinks} href='/'>Ubicación</a></li>
                    <li><a className={styles.footerLinks} href='/'>Contacto</a></li>
                </ul>
            </div>
        </footer>
    </>
  )
}

export default Footer