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
  const [error, setError] = useState({});
  const [patCheckError,setPatCheckError] = useState(false);
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
      clearError();
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
      // setError(err);
      // setPatCheckError(true)
      setLoader(false);
      // console.log(error)
    }
  };
  const handleNewPatSubmit = async (e) => {
    try {
      e.preventDefault();
      clearError()
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
  function clearError(){
    setError(false);
    setPatCheckError(false);
  }
  return (
    <>
      <NavBar />
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
                // style={patCheckError && {border:'1px solid red'}}
              />
              <label>Enter The Doctor's Name</label>
              <input
                type="text"
                onChange={(e) => setDocname(e.target.value)}
                className={styles.search}
                required
                // style={error ? {border:'1px solid red'} : {}}
              />
              {/* {patCheckError && (
                <p className={styles.errorMessage}>{error}</p>
              )} */}
              <button type="submit" className={styles.btn}>
                Submit
              </button>
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
          )}
        </div>
      </div>
    </>
  );
}

export default PatientAdd;
