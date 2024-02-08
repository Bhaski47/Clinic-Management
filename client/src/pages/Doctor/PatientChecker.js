import React from 'react'
import styles from '../../styles/page/PatientChecker.module.css'
import DocNavBar from '../../components/Doctor/DocNavBar'

function PatientChecker() {
    return (
        <>
            <DocNavBar />
            <div className={styles.container}>
                <div className={styles.patientChecker}>
                    <div className={styles.addContainer}>
                        <form className={styles.formContainer}>
                            <div className={styles.formGroup}>
                                <label htmlFor="patientName">Name Of The Patient</label>
                                <input type="text" id="patientName" required disabled />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="age">Age</label>
                                <input type="number" id="age" required disabled/>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input type="number" id="phoneNumber" required disabled/>
                            </div>
                            <div className={styles.formGroup}>
                                {/* <label htmlFor="gender">Gender</label>
                                <select id="gender" required>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select> */}
                                <label htmlFor="token">Token</label>
                                <input type="number" id="token" required placeholder='Enter Token Number' />
                                <button type="submit" className={styles.buttons}>Check</button>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="address">Prescription</label>
                                <textarea id="address" cols="30" rows="10" required></textarea>
                            </div>
                            <button type="submit" className={styles.buttons}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PatientChecker
