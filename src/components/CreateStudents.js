import AllNum from './AllNum';

import React, { useState, useEffect } from 'react';

function CreateStudents({  onConfirm, onCancel}) {
    const [showPopup, setShowPopup] = useState(false);
  const [fristName, setFristName] = useState('');
  const [lastName, setLastName] = useState('');
  const [school, setSchool] = useState('');
  const [maxId, setMaxId] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  
  
  useEffect(() => {
    setSchool(1);
  
    handleAddStudent();
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
      })
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  const handleAddStudent = () => {
    setShowPopup(true);
  };

  const handleSubmit = () => {
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

    // รีเซ็ตค่าในสถานะหลังจากส่งข้อมูล
    setFristName('');
    setLastName('');
    setSchool('');
    setShowPopup(false);
  };
  return (
    <div>
      
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>เพิ่มนักเรียนใหม่</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <input
              type="text"
              placeholder="First Name"
              value={fristName}
              onChange={e => setFristName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
            {/* <input
              type="text"
              placeholder="School"
              value={school}
              onChange={e => setSchool(e.target.value)}
            /> */}
            <button className='Butt' onClick={handleSubmit}>Submit</button>
            <button className='Butt' onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateStudents;
