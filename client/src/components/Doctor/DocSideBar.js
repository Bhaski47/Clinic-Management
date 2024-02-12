import React from "react";
import styles from "../../styles/components/SideBar.module.css";
// import { Link } from "react-router-dom";
import {NavLink, useNavigate} from 'react-router-dom'

function DocSideBar({name}) {
  const navigate = useNavigate();
  const handleSignOut = (e) =>{
    e.preventDefault()
    localStorage.clear()
    navigate("/")
  }
  return (
    <div className={styles.container}>
      <div className={styles.clinicDetails}>
        <h1>Care Clinic</h1>
      </div>
      <div className={styles.navContainer}>
        <ul>
          <NavLink to="/doc/dash" className={styles.active}>
            <li>
              <span className={styles.icon}>
                <span name="home-outline"></span>
              </span>
              <h3 className={styles.title}>Dashboard</h3>
            </li>
          </NavLink>

          <NavLink to="/doc/dash/pats">
            <li>
              <span className={styles.icon}>
                <span name="people-outline"></span>
              </span>
              <h3 className={styles.title}>Patient Checker</h3>
            </li>
          </NavLink>

          <NavLink to="/doc/dash/docinfo">
            <li>
              <span className={styles.icon}>
                <span name="help-outline"></span>
              </span>
              <h3 className={styles.title}>User Info</h3>
            </li>
          </NavLink>
          <li>
            <button
              className={`${styles.button} ${styles.type1}`}
              onClick={handleSignOut}
            >
              <span className={styles.btntxt}>Sign Out</span>
            </button>
          </li>
        </ul>
      </div>
      <div className={styles.userData}>
        <h2>{name}</h2>
      </div>
    </div>
  );
}

export default DocSideBar;
