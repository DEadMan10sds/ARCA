import React from 'react'
import styles from '../styles/us.module.css'

function Us() {
  return (
    <div className={styles.container}>Nosotros
        <div className={styles.layer}>
            <div className={styles.layerTitle}>Misión: </div>
            <div className={styles.layerContent}>
                Buscar el favor de Dios <br/>
                Para lograr salvación a travez de un compromiso dentro del arca.
            </div>
        </div>
        <div className={styles.layer}>
            <div className={styles.layerTitle}>Visión: </div>
            <div className={styles.layerContent}>
                Enseñar la salvación de Jesús a todo joven para impactar mi generación.
            </div>
        </div>
        <div className={styles.layer}>
            <div className={styles.layerTitle}>Nuestra estrategia: </div>
            <div className={styles.layerContent}>
                Ingresar al arca.
            </div>
        </div>
    </div>
  )
}

export default Us