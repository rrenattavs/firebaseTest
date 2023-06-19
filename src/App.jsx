import React, { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { DataGrid } from "@mui/x-data-grid";  
import "./App.css";

function App() {
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [tagFilter, setTagFilter] = useState("");
  const [demographicFilter, setDemographicFilter] = useState("youth");
 

  useEffect(() => {
    const getScholarships = async () => {
      const schoolCollectionRef = collection(db, "scholarships2");
      const querySnapshot = await getDocs(schoolCollectionRef);
      const scholarshipData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setScholarships(scholarshipData);
      setFilteredScholarships(scholarshipData);
    };

    getScholarships();
  }, []);

  const handleTagFilterChange = (e) => {
    const filterValue = e.target.value.toLowerCase();
    setTagFilter(filterValue);
    applyFilters(filterValue, demographicFilter);
  };

  const handleDemographicFilterChange = (e) => {
    const filterValue = e.target.value.toLowerCase();
    setDemographicFilter(filterValue);
    applyFilters(tagFilter, filterValue);
  };

  const applyFilters = (tagFilterValue, demographicFilterValue) => {
    const filteredData = scholarships.filter((scholarship) => {
      const tagMatch = scholarship.tag.toLowerCase().includes(tagFilterValue);
      const demographicMatch = scholarship.demographic
        .toLowerCase()
        .includes(demographicFilterValue);
      return tagMatch && demographicMatch;
    });
    setFilteredScholarships(filteredData);
  };



  const columns = [
    { field: "scholarship", headerName: "Scholarship", width: 200 },
    { field: "deadline", headerName: "Deadline", width: 150 },
    { field: "url", headerName: "URL", width: 200 },
    { field: "value", headerName: "Value", width: 120 },
    { field: "demographic", headerName: "Demographic", width: 200 },
    { field: "requirements", headerName: "Requirements", width: 250 },
    { field: "tag", headerName: "Tag", width: 120 },
  ];
  return (
    <div className="App">
      {/* <DataFilter 
        selected ={demographicFilter}
            onChangeFilter ={filterChangeHandler}
          /> */}
      <div className="filter">
        <label htmlFor="tagFilter">Tag Filter:</label>
         <select
          id="tagFilter"
          value={tagFilter}
          onChange={handleTagFilterChange}
        >
          <option value="">All</option>
          <option value="high school">High School</option>
          <option value="bachelor">Bachelor</option>
          <option value="pos-graduate">Pos graduated</option>
          <option value="master">Master</option>
          <option value="undergraduate">Undergraduate</option>
        </select>
      </div>
      <div className="filter">
        <label htmlFor="demographicFilter">Demographic Filter:</label>
        <select
          id="demographicFilter"
          value={demographicFilter}
          onChange={handleDemographicFilterChange}
        >
          <option value="">All</option>
          <option value="any">Any</option>
          <option value="youth">Youth</option>
          <option value="canadian">Canadian</option>
          <option value="women">Women</option>
          <option value="international">International</option>
        </select>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={filteredScholarships} columns={columns} />
      </div>
    </div>
  );
}

export default App;
