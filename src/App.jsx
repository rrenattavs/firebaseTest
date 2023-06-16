import React, { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import "./App.css";

function App() {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    const getScholarships = async () => {
      const schoolCollectionRef = collection(db, "scholarships2");
      const querySnapshot = await getDocs(schoolCollectionRef);
      const scholarshipData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setScholarships(scholarshipData);
    };

    getScholarships();
  }, []);

  return (
    <div className="App">
      <table className="table table-bordered">
        <thead>
          <th>scholarship</th>
          <th>deadline</th>
          <th>url</th>
          <th>value</th>
          <th>demographic</th>
          <th>requirements</th>
          <th>tag</th>
        </thead>
        <tbody>
          {scholarships.map((scholarship) => (
            <tr key={scholarship.id}>
              <td>{scholarship.scholarship}</td>
              <td>{scholarship.deadline}</td>
              <td>{scholarship.url}</td>
              <td>{scholarship.value}</td>
              <td>{scholarship.demographic}</td>
              <td>{scholarship.requirements}</td>
              <td>{scholarship.tag}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
