import React from "react";
import styles from "../styles/components/SideBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";

function SideBar({ name }) {
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
          <NavLink to="/recept/dashboard" className={({isActive})=>isActive ? styles.active : undefined}>
            <li>
              <span className={styles.icon}>
                <span name="home-outline"></span>
              </span>
              <h3 className={styles.title}>Dashboard</h3>
            </li>
          </NavLink>

          <NavLink to="/recept/pats" className={({isActive})=>isActive ? styles.active : undefined}>
            <li>
              <span className={styles.icon}>
                <span name="people-outline" className={({isActive})=>isActive ? styles.active : undefined}></span>
              </span>
              <h3 className={styles.title}>Patient Management</h3>
            </li>
          </NavLink>

          <NavLink to="/recept/bill" className={({isActive})=>isActive ? styles.active : undefined}>
            <li>
              <span className={styles.icon}>
                <span name="chatbubble-outline"></span>
              </span>
              <h3 className={styles.title}>Billing</h3>
            </li>
          </NavLink>

          <NavLink to="/recept/userinfo" className={({isActive})=>isActive ? styles.active : undefined}>
            <li>
              <span className={styles.icon}>
                <span name="help-outline"></span>
              </span>
              <h3 className={styles.title}>User Info</h3>
            </li>
          </NavLink>
          <li>
            <button className={`${styles.button} ${styles.type1}`} onClick={handleSignOut}>
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

export default SideBar;
