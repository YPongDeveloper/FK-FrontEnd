import React, { useState } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';

const ExportCSV = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://3.24.218.91:5000/students');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Fetch Data'}
      </button>
      <br />
      {data.length > 0 && (
        <CSVLink data={data} filename="students.csv" style={{color:"white"}}>
          Download CSV
        </CSVLink>
      )}
    </div>
  );
};

export default ExportCSV;
