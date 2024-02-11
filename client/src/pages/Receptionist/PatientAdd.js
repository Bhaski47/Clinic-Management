import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import styles from "../../styles/page/PatientAdd.module.css";
import Loader from "../../utils/Loader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function PatientAdd() {
  const navigate = useNavigate();
  const [isExist, setExist] = useState(true);
  const [getDocname, setDocname] = useState(null);
  const [getNumber, setNumber] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoader(true);
      const fetchData = await axios.post(
        "https://careconnect-5ssb.onrender.com/api/recept/createtoken",
        {
          docname: getDocname,
          patNo: getNumber,
        }
      );
      console.log("Generated ID : "+fetchData.data.tokenID);
      setLoader(false);
    } catch (err) {
        setError(err);
        setLoader(false);
    }
  };
  useEffect(() => {
    const localData = localStorage.getItem("receptData");
    if (!localData) return navigate("/");
  }, [navigate]);
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        {isExist && !loader && (
          <div className={styles.checkNoBox}>
            <label>Enter The Patients Phone Number</label>
            <input
              type="number"
              onChange={(e) => setNumber(e.target.value)}
              className={styles.search}
              required
            />
            <label>Enter The Doctor's Name</label>
            <input
              type="text"
              onChange={(e) => setDocname(e.target.value)}
              className={styles.search}
              required
            />
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
            {error && (
              <p className={styles.errorMessage}>Patient Already Exist</p>
            )}
            <div>
              <span
                onClick={() => setExist((prev) => !prev)}
                className={styles.signupMessage}
              >
                Patient Not Registered?
              </span>
            </div>
          </div>
        )}
        {isExist && loader && (
          <div className={styles.checkNoBox}>
            <Loader />
          </div>
        )}
        {!isExist && (
          <div className={styles.addPatient}>
            <div className={styles.addContainer}>
              <form className={styles.formContainer}>
                <div className={styles.formGroup}>
                  <label htmlFor="patientName">Name Of The Patient</label>
                  <input type="text" id="patientName" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="age">Age</label>
                  <input type="number" id="age" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input type="number" id="phoneNumber" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="gender">Gender</label>
                  <select id="gender" required>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="address">Address</label>
                  <textarea
                    id="address"
                    cols="30"
                    rows="10"
                    required
                  ></textarea>
                </div>
                <button type="submit" className={styles.buttons}>
                  Submit
                </button>
                <h4 onClick={() => setExist((prev) => !prev)}>
                  Does The Patient Already Have An Account ?
                </h4>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PatientAdd;
