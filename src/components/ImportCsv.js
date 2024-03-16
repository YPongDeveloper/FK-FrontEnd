import React, { useState } from 'react';
import axios from 'axios';
import { useCSVReader } from 'react-papaparse';

const ImportCsv = () => {
  const [jsonData, setJsonData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [maxId, setMaxId] = useState(0);

  const handleFileUpload = (data) => {
    // เลือกคอลัมน์ที่ต้องการจากข้อมูล CSV
    const filteredData = data.map(row => ({
      fristName: row.data[0],
      lastName: row.data[1]
    }));

    setJsonData(filteredData);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // ดึงข้อมูลนักเรียนเพื่อหา id ที่มากที่สุด
      const studentsResponse = await fetch('http://3.24.218.91:5000/students');
      const studentsData = await studentsResponse.json();

      let maxId = 0;
      studentsData.forEach(student => {
        if (student.id > maxId) {
          maxId = student.id;
        }
      });

      // กำหนดค่า maxId ที่ได้
      setMaxId(maxId);

      // ส่งข้อมูล POST
      const response = await axios.post('http://3.24.218.91:5000/create', jsonData.map((item, index) => ({
        id: maxId + index + 1,
        fristName: item.fristName,
        lastName: item.lastName,
        school: 1
      })));

      console.log('Data successfully posted:', response.data);
    } catch (error) {
      console.error('Failed to post data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const { errors, data } = useCSVReader({
    onError: (error) => console.error('CSVReader error:', error),
    onFileLoaded: handleFileUpload,
    noClick: true,
    noDrag: true
  });

  return (
    <div>
      
      <input type="file" {...useCSVReader} />
      <br />
      <button onClick={handleSubmit} disabled={isLoading}>Submit</button>
    </div>
  );
};

export default ImportCsv;
