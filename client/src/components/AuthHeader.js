import React from 'react';
import styles from '../styles/components/AuthHeader.module.css';

function AuthHeader() {
  return (
    <div className={styles.navContainer}>
      <div></div>
      <div className={styles.userInfo}>
        <h3 className={styles.userName}>Bhaskar</h3>
        <button className={styles.button}>Sign Out</button>
      </div>
    </div>
  )
}

export default AuthHeader
