import React from 'react'
import styles from '../styles/components/SideBar.module.css'
import { Link } from 'react-router-dom'
// import {NavLink} from 'react-router-dom'

function SideBar() {
    
  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
            <ul>
                <li>
                    <Link to="/recept/dashboard">
                        <span className={styles.icon}>
                            <span name="logo-apple"></span>
                        </span>
                        <span className={styles.title}>Clinical</span>
                    </Link>
                </li>

                <li>
                    <Link to="/recept/dashboard">
                        <span className={styles.icon}>
                            <span name="home-outline"></span>
                        </span>
                        <span className={styles.title}>Dashboard</span>
                    </Link>
                </li>

                <li>
                    <Link to="/recept/dashboard/pats">
                        <span className={styles.icon}>
                            <span name="people-outline"></span>
                        </span>
                        <span className={styles.title}>Patient Management</span>
                    </Link>
                </li>

                <li>
                    <Link to="/recept/dashboard/bill">
                        <span className={styles.icon}>
                            <span name="chatbubble-outline"></span>
                        </span>
                        <span className={styles.title}>Billing</span>
                    </Link>
                </li>

                <li>
                    <Link to="/">
                        <span className={styles.icon}>
                            <span name="help-outline"></span>
                        </span>
                        <span className={styles.title}>User Info</span>
                    </Link>
                </li>

                
            </ul>
        </div>
    </div>
  )
}

export default SideBar
