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
  const [getnewPatName, setNewPatName] = useState("");
  const [getnewPatAge, setNewPatAge] = useState("");
  const [getnewPatPhno, setNewPatPhno] = useState("");
  const [getnewPatAddr, setNewPatAddr] = useState("");
  const [fetchTokId,setFetchTokid] = useState(false);
  const [isFetched,setFetchedID] = useState(0)
  const [selectedGender, setSelectedGender] = useState("Female");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoader(true);
      const fetchData = await axios.post(
        // "http://localhost:3006/api/recept/createtoken",
        "https://careconnect-5ssb.onrender.com/api/recept/createtoken",
        {
          docname: getDocname,
          patNo: getNumber,
        }
      );
      setFetchedID(fetchData.data.tokenID);
      setFetchTokid(true);
      console.log("Generated ID : " + fetchData.data.tokenID);
      setLoader(false);
    } catch (err) {
      setError(err);
      setLoader(false);
    }
  };
  const handleNewPatSubmit = async (e) => {
    try {
      e.preventDefault();
      // console.log(selectedGender);
      await axios.post(
        "https://careconnect-5ssb.onrender.com/api/recept/receptregister",
        {
          name: getnewPatName,
          age: getnewPatAge,
          gender: selectedGender,
          phno: getnewPatPhno,
          patPh: getnewPatPhno,
          address:getnewPatAddr
        }
      );
      // console.log("Success")
    } catch (error) {
      console.log("Error ", error);
    }
  };
  useEffect(() => {
    const localData = localStorage.getItem("receptData");
    if (!localData) return navigate("/");
  }, [navigate]);
  return (
    <>
      <NavBar />
      {/* <div className={styles.container}>
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
                  <input type="text" id="patientName" required onChange={(e)=>setNewPatName(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="age">Age</label>
                  <input type="number" id="age" required onChange={(e)=>setNewPatAge(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input type="number" id="phoneNumber" required onChange={(e)=>setNewPatPhno(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="gender">Gender</label>
                  <select id="gender" required value={selectedGender} onChange={(e)=>setSelectedGender(e.target.value)}>
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
                  onChange={(e)=>setNewPatAddr(e.target.value)}></textarea>
                </div>
                <button type="submit" className={styles.buttons} onClick={handleNewPatSubmit}>
                  Submit
                </button>
                <h4 onClick={() => setExist((prev) => !prev)}>
                  Does The Patient Already Have An Account ?
                </h4>
              </form>
            </div>
          </div>
        )}
      </div> */}
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h1>Patient Management</h1>
          <p>(Add Patient or Give Token Number)</p>
          {isExist && !fetchTokId && !loader && (
            <form className={styles.checkNoBox} onSubmit={handleSubmit}>
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
              <button type="submit" className={styles.btn}>
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
            </form>
          )}
          {
            isExist && fetchTokId &&
            <>
            <h1 className={styles.tokId}>Your ID</h1>
            <h1 className={styles.tokId}>{isFetched}</h1>
            <button className={styles.btn} onClick={()=>setFetchTokid(false)}>Close</button>
            </>
          }
          {isExist && loader && (
            <div className={styles.checkNoBox}>
              <Loader />
            </div>
          )}
          {!isExist && (
            // <div className={styles.addPatient}>
              <div className={styles.addContainer}>
                <form className={styles.formContainer} onSubmit={handleNewPatSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="patientName">Name Of The Patient</label>
                    <input
                      type="text"
                      id="patientName"
                      required
                      onChange={(e) => setNewPatName(e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="age">Age</label>
                    <input
                      type="number"
                      id="age"
                      required
                      onChange={(e) => setNewPatAge(e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      type="number"
                      id="phoneNumber"
                      required
                      onChange={(e) => setNewPatPhno(e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      required
                      value={selectedGender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                    >
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
                      placeholder="Optional"
                      onChange={(e) => setNewPatAddr(e.target.value)}
                    ></textarea>
                  </div>
                  <div style={{display:'grid',placeContent:'center'}}>
                  <button
                    type="submit"
                    className={styles.btn}
                  >
                    Submit
                  </button>
                  </div>
                  <h3 className={styles.changeText} onClick={() => setExist((prev) => !prev)}>
                    Does The Patient Already Have An Account ?
                  </h3>
                </form>
              </div>
            // </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PatientAdd;
