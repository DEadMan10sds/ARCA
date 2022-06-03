import React from 'react';
import styles from '../styles/location.module.css';
import location from '../images/general/location.png';
function Location() {
  return (
    <div className={styles.container}>
        <div className={styles.imageContainer}>
            <img src={location} alt="Ubicación" width="600px"/>
        </div>
        <aside className={styles.aside}>
            <a href='https://www.google.com.mx/maps/place/San+Luis+Potosi+-+Rioverde+401,+Quintas+de+la+Hacienda+2,+78420+San+Luis,+S.L.P./@22.1461335,-100.8787136,17z/data=!3m1!4b1!4m5!3m4!1s0x842aa41060a6f133:0xd7a905e4b7511d08!8m2!3d22.1461285!4d-100.8765249'> San Luis Potosi - Rioverde 401 <br/> Quintas de la Hacienda 2<br/> 78420 San Luis, S.L.P. </a>
        </aside>
    </div>
  )
}

export default Location