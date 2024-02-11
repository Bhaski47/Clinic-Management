import React, { useState, useEffect } from "react";
import styles from "../../styles/page/ReceptionistDash.module.css";
import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ReceptionistDash() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [receptData, setReceptData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localData = await localStorage.getItem("receptData");

        if (!localData) {
          navigate("/");
          return;
        }

        const parsedLocalData = JSON.parse(localData);

        setReceptData((prevReceptData) => {
          if (
            JSON.stringify(prevReceptData) !== JSON.stringify(parsedLocalData)
          ) {
            return parsedLocalData;
          }
          return prevReceptData;
        });

        if (parsedLocalData.data) {
          const response = await axios.post(
            "http://localhost:3006/api/recept/retrecept",
            { id: parsedLocalData.data._id }
          );
          // console.log(response)
          setData((prevData) => {
            if (
              JSON.stringify(prevData) !== JSON.stringify(response.data.data)
            ) {
              return response.data.data;
            }
            return prevData;
          });
          // console.log(1);
          // console.log("data: ", data);
        }

        // console.log(receptData);
      } catch (error) {
        console.error("Error while getting local data:", error);
      }
    };

    fetchData();
  }, [navigate, receptData, data]);

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.tableContainer}>
          <div className={styles.searchBar}>
            <input type="text" className={styles.search} placeholder="Search" />
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name Of Doctor</th>
                <th>Name Of Patient</th>
                <th>Time</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody className={styles.patient}>
              {data.doctor &&
                data.doctor.map((item, index) => {
                  let convertedDate = new Date(item.createdAt).toLocaleString();
                  return(
                    <tr key={index} className={styles.patDetails}>
                      <td>{index + 1}</td>
                      <td>{item.docObjectId.name}</td>
                      <td>{item.patId.name}</td>
                      <td>{convertedDate}</td>
                      <td>{item.amount}</td>
                    </tr>
                  )
                })}
              {/* <td>{item.time}</td> */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ReceptionistDash;
