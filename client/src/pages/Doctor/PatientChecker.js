import React, { useEffect, useState } from "react";
import styles from "../../styles/page/PatientChecker.module.css";
import DocNavBar from "../../components/Doctor/DocNavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PatientChecker() {
  const navigate = useNavigate();
  const init = {};
  const [localData, setLocalData] = useState(init);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempData = localStorage.getItem("docData");
        const trimmedData = tempData.replace(/[\u200B-\u200D\uFEFF]/g, '');
        setLocalData(JSON.parse(trimmedData));
        console.log(JSON.parse(localData));
        console.log("local " + localData);
        if (!tempData) {
          navigate("/");
          return;
        }
      } catch (err) {
        console.log("err "+err)
      }
    };
    fetchData();
  }, [navigate]);
  const [tokenValid, setTokenValid] = useState("");
  const [tokenChecked, setTokenChecked] = useState(false);
  const [name, setName] = useState("");
  const [phno, setPhno] = useState("");
  const [age, setAge] = useState("");
  const [docName, setDocname] = useState("");
  const [patId, setPatid] = useState("");
  const prescriptionsFromServer = [];
  const [prescription, setPrescription] = useState(prescriptionsFromServer);
  const [enteredPres, setEnteredPres] = useState("");
  //   console.log(tokenValid);
  const checkToken = async (e) => {
    e.preventDefault();
    if (!tokenValid) return;
    const fetch = await axios.post("http://localhost:3006/api/docs/rettoken", {
      id: tokenValid,
    });
    setDocname(fetch.data.data.docs.name);
    setName(fetch.data.data.patient.name);
    setAge(fetch.data.data.patient.age);
    setPhno(fetch.data.data.patient.phno);
    setPrescription(fetch.data.data.patient.combinedData);
    setPatid(fetch.data.data.patient._id);
    setTokenChecked(true);
    console.log(fetch);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tokenValid) return;
    if (!tokenChecked) return;
    if (!enteredPres) return console.log(0);
    try {
      const sendData = await axios.post(
        "http://localhost:3006/api/docs/enqpat",
        {
          patid: patId,
          id: localData.data.data._id,
          pres: enteredPres,
        }
      );
      console.log(sendData.data);
      setTokenChecked(false);
    } catch (error) {
      console.log("error" + error);
    }
  };
  return (
    <>
      <DocNavBar />
      <div className={styles.container}>
        <div className={styles.patientChecker}>
          <div className={styles.addContainer}>
            <form className={styles.formContainer}>
              <div className={styles.formGroup}>
                <label htmlFor="patientName">Name Of The Doctor</label>
                <input
                  type="text"
                  id="patientName"
                  required
                  disabled
                  value={docName}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="patientName">Name Of The Patient</label>
                <input
                  type="text"
                  id="patientName"
                  required
                  disabled
                  value={name}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="age">Age</label>
                <input type="number" id="age" required disabled value={age} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="number"
                  id="phoneNumber"
                  required
                  disabled
                  value={phno}
                />
              </div>
              <div className={styles.formGroup}>
                {/* <label htmlFor="gender">Gender</label>
                                <select id="gender" required>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select> */}
                <label htmlFor="token">Token</label>
                <input
                  type="number"
                  id="token"
                  required
                  placeholder="Enter Token Number"
                  onChange={(e) => setTokenValid(e.target.value)}
                  value={tokenValid}
                />
                <button
                  type="submit"
                  className={styles.buttons}
                  onClick={checkToken}
                >
                  Check
                </button>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="address">Previous Consultations</label>
                {prescription.map((data, index) => {
                  //   const parsedPrescription = JSON.parse(data.prescription);
                  return (
                    <li key={index}>
                      {data.doctorName}-{data.prescription}
                    </li>
                  );
                })}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="address">Prescription</label>
                <textarea
                  id="address"
                  cols="30"
                  rows="10"
                  required
                  onChange={(e) => setEnteredPres(e.target.value)}
                ></textarea>
              </div>
              <button
                type="submit"
                className={styles.buttons}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientChecker;
