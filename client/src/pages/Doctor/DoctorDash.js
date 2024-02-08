import React from 'react'
import styles from '../../styles/page/ReceptionistDash.module.css'
import DocNavBar from '../../components/Doctor/DocNavBar'

function DoctorDash() {

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

  return (
    <>
      <DocNavBar />
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

export default DoctorDash
