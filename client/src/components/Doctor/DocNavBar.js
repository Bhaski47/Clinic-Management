import React, { useEffect } from 'react';
import styles from '../../styles/components/AuthHeader.module.css';
import DocSideBar from './DocSideBar';
import { useNavigate } from 'react-router-dom';

function DocNavBar() {
  const navigate = useNavigate();
  useEffect(() => {
    const localData = localStorage.getItem("docData");
    if (!localData) return navigate("/");
    console.log(localData);
}, [navigate]);
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
      <DocSideBar />
    </>
  )
}

export default DocNavBar
