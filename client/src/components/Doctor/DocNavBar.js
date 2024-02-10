import React, { useEffect, useState } from "react";
import styles from "../../styles/components/AuthHeader.module.css";
import DocSideBar from "./DocSideBar";
import { useNavigate } from "react-router-dom";

function DocNavBar() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  useEffect(() => {
    let localData = localStorage.getItem("docData");
    if (!localData) return navigate("/");
    localData = JSON.parse(localData);
    // console.log(localData.data.data.name);
    setName(localData.data.data.name);
  }, [navigate]);
  return (
    <>
      <div className={styles.navContainer}>
        <div className={styles.navBar}>
          <div></div>
          <div className={styles.userInfo}>
            <div></div>
            <h3 className={styles.userName}>{name}</h3>
            <button className={`${styles.button} ${styles.type1}`}>
              <span className={styles.btntxt}>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
      <DocSideBar />
    </>
  );
}

export default DocNavBar;
