import React, { useEffect, useState } from "react";
import styles from "../../styles/page/ReceptionistDash.module.css";
import DocNavBar from "../../components/Doctor/DocNavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DoctorDash() {
  const initialData = {
    _id: "65c7a279a9daa57852e12d8d",
    name: "Bhaski",
    email: "a@gmail.com",
    password: "$2b$10$ciL/HGbQ6ywFofCLkjpXROd/DGyosiurFgG2btj3xIbsmqAUQj88m",
    age: 8,
    phno: "1234567890",
    gender: "male",
    patConsult: [],
    __v: 0,
  };
  const [tempData,setTempData] = useState("")
  const [localData, setLocalData] = useState({ data: { data: initialData } }); // Update initial state
  const [isFetch, setIsFetch] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsFetch(true);
      const temp = await localStorage.getItem("docData");
      const parsedData = temp ? JSON.parse(temp) : {};
      setLocalData(parsedData)
      // console.log(localData);
      // console.log(temp)
      if (!temp) {
        navigate("/");
        return;
      }
      setIsFetch(false);
    };
  
    fetchData();

  }, [navigate]);

  // useEffect(() => {
  //   if (tempData) {
  //     setLocalData(tempData);
  //     console.log(localData);
  //   }
  // }, [tempData]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchID = localData.data.data._id;
      // const id = "65c3bfc511ad6e05a712b26e";
      // console.log(fetchID);
      if (fetchID) {
        const response = await axios.post(
          "http://localhost:3006/api/docs/retdoc",{
            id:fetchID
          }
        );
        setData(response.data.data.patConsult);
      }
    };

    if (!isFetch) {
      fetchData();
    }
  }, [localData]);

  // ...

  // const data = [
  //   {
  //     Name: "Bhaski",
  //     Age: "30",
  //     Time: new Date("2024-02-07T19:40:26.847Z").toLocaleDateString(),
  //   },
  //   {
  //     Name: "Bhaski",
  //     Age: "30",
  //     Time: new Date("2024-02-07T19:40:26.847Z").toLocaleDateString(),
  //   },
  //   {
  //     Name: "Bhaski",
  //     Age: "30",
  //     Time: new Date("2024-02-07T19:40:26.847Z").toLocaleDateString(),
  //   },
  //   {
  //     Name: "Bhaski",
  //     Age: "30",
  //     Time: new Date("2024-02-07T19:40:26.847Z").toLocaleDateString(),
  //   },
  // ];

  return (
    <>
      <DocNavBar />
      <div className={styles.container}>
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
      </div>
    </>
  );
}

export default DoctorDash;
