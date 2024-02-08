import React from 'react'
import NavBar from '../../components/NavBar'
import styles from '../../styles/page/BillingAmount.module.css'

function BillingAmount() {
    return (
        <>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.checkNoBox}>
                    <form className={styles.formContainer}>
                        <div className={styles.formGroup}>
                            <label>Name Of The Patient</label>
                            <input type="text" disabled placeholder='Enter The Phone Number' />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Age</label>
                            <input type="number" disabled placeholder='Enter The Phone Number' />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Name Of The Doctor</label>
                            <input type="text" required />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Phone Number Of The Patient</label>
                            <input type="number" required />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Amount</label>
                            <input type="number" required />
                        </div>
                        <button type='submit' className={styles.buttons} >Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default BillingAmount
