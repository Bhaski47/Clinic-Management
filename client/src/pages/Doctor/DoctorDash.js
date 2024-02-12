import React, { useEffect, useState } from "react";
import styles from "../../styles/page/ReceptionistDash.module.css";
import DocNavBar from "../../components/Doctor/DocNavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DoctorDash() {
  const initialData = {
    _id: "",
    name: "",
    email: "",
    password: "",
    age: 8,
    phno: "",
    gender: "",
    patConsult: [],
    __v: 0,
  };
  const [localData, setLocalData] = useState({ data: { data: initialData } });
  const [data, setData] = useState([]);
  const [pat,setPat] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const temp = await localStorage.getItem("docData");
      const parsedData = temp ? JSON.parse(temp) : {};
      setLocalData((prevLocalData) => {
        if (
          JSON.stringify(prevLocalData) !== JSON.stringify(parsedData)
        ) {
          return parsedData;
        }
        return prevLocalData;
      });
      console.log(localData.data.data._id)
      if (!temp) {
        navigate("/");
        return;
      }
      if (localData.data.data._id) {
        const fetchID = localData.data.data._id;
        const response = await axios.post(
          "https://careconnect-5ssb.onrender.com/api/docs/retdoc",
          {
            id: fetchID,
          }
        );
        setData(response.data.data.patConsult);
        setPat(response.data.data.patConsult.length);
        console.log(data);
      }
    };

    fetchData();
  }, [navigate, localData]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const fetchID = localData.data.data._id;
  //     // const id = "65c3bfc511ad6e05a712b26e";
  //     // console.log(fetchID);
  //     if (fetchID) {
  //       const response = await axios.post(
  //         "https://careconnect-5ssb.onrender.com/api/docs/retdoc",
  //         {
  //           id: fetchID,
  //         }
  //       );
  //       setData(response.data.data.patConsult);
  //       console.log(data);
  //     }
  //   };

  //   if (!isFetch) {
  //     fetchData();
  //   }
  // }, [localData]);
  return (
    <>
      <DocNavBar />
      {/* <div className={styles.container}>
        <div className={styles.tableContainer}>
          <div className={styles.searchBar}>
            <input type="text" className={styles.search} placeholder="Search" />
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name Of Patient</th>
                <th>Age</th>
                <th>Ph No</th>
                <th></th>
              </tr>
            </thead>
            <tbody className={styles.patient}>
              {data && data.map((data, index) => {
                return(
                  <tr key={index} className={styles.patDetails}>
                    <td>{index + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.age}</td>
                    <td>{data.phno}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div> */}
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h1>Dashboard</h1>
          <br />
          <div className={styles.totalPatients}>
            <h2>Patients </h2>
            <h1>{pat}</h1>
          </div>
          <h1 style={{ textAlign: "center" }}>
            All Patients And Doctor Records
          </h1>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name Of Patient</th>
                  <th>Ph No</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody className={styles.patient}>
                {data &&
                  data.map((item, index) => {
                    return (
                      <tr key={index} className={styles.patDetails}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.phno}</td>
                        <td>{item.gender}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorDash;
