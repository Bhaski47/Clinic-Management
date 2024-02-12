import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import styles from "../../styles/page/UserInfo.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserInfo = () => {
  const navigate = useNavigate();
  const [receptData, setReceptData] = useState({});
  useEffect(() => {
    const localData = localStorage.getItem("receptData");
    console.log(JSON.parse(localData))
    if (!localData) return navigate("/");
    setReceptData(JSON.parse(localData));
  }, [navigate]);
  return (
    <>
    <NavBar/>
      <div className={styles.wrapper}>
        <div className={styles.container}>
            <h1>Hi ! { receptData.data && (receptData.data.name)}</h1>
            <p className={styles.subHead}>Receptionist</p>
            <h2>Name: <h4> {receptData.data && receptData.data.name}</h4></h2>
            <h2>Age: <h4>{receptData.data && receptData.data.age }</h4></h2>
            <h2>Gender: <h4>{receptData.data && receptData.data.gender}</h4></h2>
            <h2>Ph No:<h4> {receptData.data && receptData.data.phno}</h4></h2>
            <h2>Email:<h4> {receptData.data && receptData.data.email}</h4></h2>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
