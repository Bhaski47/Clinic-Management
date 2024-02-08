import React from 'react';
import styles from '../styles/components/AuthHeader.module.css';
import SideBar from './SideBar';

function NavBar() {
  return (
    <>
      <div className={styles.navContainer}>
        <div className={styles.navBar}>
          <div></div>
          <div className={styles.userInfo}>
            <div></div>
            <h3 className={styles.userName}>Bhaskar</h3>
            <button className={`${styles.button} ${styles.type1}`}>
              <span className={styles.btntxt}>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
      <SideBar />
    </>
  )
}

export default NavBar
