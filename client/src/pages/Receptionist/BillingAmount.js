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
  const [isCheck, setIsCheck] = useState(false);
  const [receptData, setReceptData] = useState({});
  const [isLoad, setIsLoad] = useState(false);
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
        "https://careconnect-5ssb.onrender.com/api/recept/retrpat",
        { phno: patNo }
      );
      setPatName(patDetails.data.name);
      setPatage(patDetails.data.age);
      setIsCheck(true);
      setIsLoad(false)
    } catch (err) {
      console.error("Error " + err);
      setIsLoad(false)
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (isCheck === false) return;
      if (!amount) return;
      setIsLoad(true);
      const response = await axios.post(
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
      setIsLoad(false)
    } catch (err) {
      setIsLoad(false)
      console.error("Error " + err);
    }
  };
  return (
    <>
      <NavBar />
      {/* <div className={styles.container}>
        <div className={styles.checkNoBox}>
          <form className={styles.formContainer}>
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
              <label>Phone Number Of The Patient</label>
              <input
                type="number"
                required
                onChange={(e) => setPatno(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className={styles.buttons}
              onClick={checkValid}
            >
              Check
            </button>
            <div className={styles.formGroup}>
              <label>Amount</label>
              <input
                type="number"
                required
                onChange={(e) => setAmount(e.target.value)}
              />
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
      </div> */}
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h1>Billing</h1>
          {/* <div className={styles.checkNoBox}> */}
          <form className={styles.formContainer}>
            {isLoad && <Loader/>}
            {!isLoad &&
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
            }
          </form>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}

export default BillingAmount;
