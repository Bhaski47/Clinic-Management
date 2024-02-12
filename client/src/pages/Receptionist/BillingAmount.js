import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import styles from "../../styles/page/BillingAmount.module.css";
import { useNavigate } from "react-router-dom";
import Loader from "../../utils/Loader";
import { useEffect } from "react";
import axios from "axios";
function BillingAmount() {
  const navigate = useNavigate();
  const [docName, setDocname] = useState("");
  const [patNo, setPatno] = useState("");
  const [amount, setAmount] = useState("");
  const [patName, setPatName] = useState("");
  const [patAge, setPatage] = useState("");
  const prescriptionsFromServer = [];
  const [prescription, setPrescription] = useState(prescriptionsFromServer);
  const [isCheck, setIsCheck] = useState(false);
  const [receptData, setReceptData] = useState({});
  const [isLoad, setIsLoad] = useState(false);
  const [idNo, setIDno] = useState(false);
  useEffect(() => {
    const localData = localStorage.getItem("receptData");
    // console.log(JSON.parse(localData))
    if (!localData) return navigate("/");
    setReceptData(JSON.parse(localData));
  }, [navigate]);

  const checkValid = async (e) => {
    try {
      e.preventDefault();
      if (!patNo) return;
      setIsLoad(true);
      const patDetails = await axios.post(
        // "http://localhost:3006/api/recept/retrpat",
        "https://careconnect-5ssb.onrender.com/api/recept/retrpat",
        { phno: patNo }
      );
      setPatName(patDetails.data.name);
      setPatage(patDetails.data.age);
      setIsCheck(true);
      setIsLoad(false);
      // const fetch = await axios.post("http://localhost:3006/api/docs/rettoken");
      const fetch = await axios.post("https://careconnect-5ssb.onrender.com/api/docs/rettoken");
      setPrescription(fetch.data.data.patient.combinedData);
      // console.log(fetch.data.data.patient.combinedData)
    } catch (err) {
      console.error("Error " + err);
      setIsLoad(false);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (isCheck === false) return;
      if (!amount) return;
      setIsLoad(true);
      console.log(docName)
      const response = await axios.post(
        // "http://localhost:3006/api/recept/bill",
        "https://careconnect-5ssb.onrender.com/api/recept/bill",
        {
          patphno: patNo,
          phno: receptData.data.phno,
          name: docName,
          amount: amount,
        }
      );
      console.log(response.data.message);
      setIsCheck(false);
      setIsLoad(false);
    } catch (err) {
      setIsLoad(false);
      console.error("Error " + err);
    }
  };
  const checkID = async (e) => {
    try {
      e.preventDefault();
      const fetch = await axios.post(
        // "http://localhost:3006/api/docs/rettoken",
        "https://careconnect-5ssb.onrender.com/api/docs/rettoken",
        { id: idNo }
      );
      // console.log(fetch)
      setIsCheck(true);
      setPatName(fetch.data.data.patient.name);
      setPatno(fetch.data.data.patient.phno);
      setPatage(fetch.data.data.patient.age);
      setPrescription(fetch.data.data.patient.combinedData);
      console.log(fetch.data.data.patient.combinedData);
    } catch (err) {
      setIsCheck(false);
      console.log(err);
    }
  };
  return (
    <>
      <NavBar />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h1>Billing</h1>
          {/* <div className={styles.checkNoBox}> */}
          <form className={styles.formContainer}>
            {isLoad && <Loader />}
            {!isLoad && (
              <>
                <div className={styles.formGroup}>
                  <label>Name Of The Patient</label>
                  <input
                    type="text"
                    disabled
                    placeholder="Enter The Phone Number"
                    value={patName}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Age</label>
                  <input
                    type="number"
                    disabled
                    placeholder="Enter The Phone Number"
                    value={patAge}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Name Of The Doctor</label>
                  <input
                    type="text"
                    required
                    onChange={(e) => setDocname(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Token ID</label>
                  <input
                    type="number"
                    placeholder="Enter ID"
                    value={idNo}
                    onChange={(e) => setIDno(e.target.value)}
                  />
                </div>
                <div style={{ display: "grid", placeContent: "center" }}>
                  <button
                    type="submit"
                    className={styles.btn}
                    onClick={checkID}
                    style={{ width: "200%" }}
                  >
                    Check ID
                  </button>
                </div>
                <div className={styles.formGroup}>
                  <label>Phone Number Of The Patient</label>
                  <input
                    type="number"
                    required
                    onChange={(e) => setPatno(e.target.value)}
                  />
                </div>
                <div style={{ display: "grid", placeContent: "center" }}>
                  <button
                    type="submit"
                    className={styles.btn}
                    onClick={checkValid}
                    style={{ width: "200%" }}
                  >
                    Check
                  </button>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="address">Previous Consultations</label>
                  {prescription &&
                    prescription.map((data, index) => {
                      //   const parsedPrescription = JSON.parse(data.prescription);
                      return (
                        <li key={index}>
                          {data.doctorName}-{data.prescription}
                        </li>
                      );
                    })}
                </div>
                <div className={styles.formGroup}>
                  <label>Amount</label>
                  <input
                    type="number"
                    required
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div style={{ display: "grid", placeContent: "center" }}>
                  <button
                    type="submit"
                    className={styles.btn}
                    onClick={handleSubmit}
                    style={{ width: "200%" }}
                  >
                    <p>Submit</p>
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}

export default BillingAmount;
