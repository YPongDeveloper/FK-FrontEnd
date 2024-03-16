
import React, { useState, useEffect } from 'react';

function CreateDb({ fristName,lastName ,school}) {
    const [maxId, setMaxId] = useState(0);
 
  
  useEffect(() => {
    
  setSchool(1);
    
    // เรียก API เพื่อดึงข้อมูลนักเรียนทั้งหมด
    fetch('http://3.24.218.91:5000/students')
      .then(response => response.json())
      .then(data => {
        // หา id ที่มากที่สุด
        let maxId = 0;
        data.forEach(student => {
          if (student.id > maxId) {
            maxId = student.id;
          }
        });
        // เซ็ตค่า maxId ที่ได้
        setMaxId(maxId);
        handleSubmit();
      })
      .catch(error => console.error('Error fetching students:', error));
  }, []);

 

  const handleSubmit =  () => {
    if (!fristName || !lastName || !school) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    const newStudentData = {
      "id": maxId + 1,
      "fristName": fristName,
      "lastName": lastName,
      "school": school
    };

    fetch('http://3.24.218.91:5000/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudentData),
    })
    .then(response => {
      if (response.ok) {
        console.log('New student added successfully.');
        window.location.reload();
      } else {
        window.confirm('School : 1: ประชาชื่น   2: อินทร  3: กนกอาชีวะ  4: บูรณพล');
        console.error('Failed to add new student.');
      }
    })
    .catch(error => console.error('Error adding new student:', error));

  };
  return null;
}

export default CreateDb;
