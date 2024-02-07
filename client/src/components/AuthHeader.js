import React from 'react';
import styles from '../styles/components/AuthHeader.module.css';

function AuthHeader() {
  return (
    <div className={styles.navContainer}>
      <div className={styles.navBar}>
        <div></div>
        <div className={styles.userInfo}>
          <div></div>
          <h3 className={styles.userName}>Bhaskar</h3>
          <button className={`${styles.button} ${styles.type1}`}>
            <span class="btn-txt">Hello</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthHeader
