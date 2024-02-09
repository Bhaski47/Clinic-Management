import React from 'react'
import styles from '../../styles/page/ReceptionistDash.module.css'
import NavBar from '../../components/NavBar'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
function ReceptionistDash() {
  const navigate = useNavigate();
  const data = [
    {
      Name: "Bhaski",
      Age: "30",
      Time: new Date('2024-02-07T19:40:26.847Z').toLocaleDateString()
    },
    {
      Name: "Bhaski",
      Age: "30",
      Time: new Date('2024-02-07T19:40:26.847Z').toLocaleDateString()
    },
    {
      Name: "Bhaski",
      Age: "30",
      Time: new Date('2024-02-07T19:40:26.847Z').toLocaleDateString()
    },
    {
      Name: "Bhaski",
      Age: "30",
      Time: new Date('2024-02-07T19:40:26.847Z').toLocaleDateString()
    },
  ]
  useEffect(() => {
    const localData = localStorage.getItem("receptData");
    if (!localData) return navigate("/");
  }, [navigate]);
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.tableContainer}>
          <div className={styles.searchBar}>
            <input type="text" className={styles.search} placeholder='Search' />
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name Of Patient</th>
                <th>Age</th>
                <th>Time</th>
                <th></th>
              </tr>
            </thead>
            <tbody className={styles.patient}>
              {data.map((data, index) => (
                <tr key={index} className={styles.patDetails}>
                  <td>{index + 1}</td>
                  <td>{data.Name}</td>
                  <td>{data.Age}</td>
                  <td>{data.Time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ReceptionistDash
