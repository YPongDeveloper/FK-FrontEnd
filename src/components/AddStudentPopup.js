import numStudents from './AllNum';
import './AddStudentPopup.css'
import React, { useState, useEffect } from 'react';

function AddStudentPopup({  onConfirm, onCancel , total}) {
    const [showPopup, setShowPopup] = useState(false);
  const [fristName, setFristName] = useState('');
  const [lastName, setLastName] = useState('');
  const [school, setSchool] = useState('');
  const [maxId, setMaxId] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [numStudents, setNumStudents] = useState();
  
  useEffect(() => {
    
      
    
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
  const fetchNumStudents = async () => {
    try {
      const response = await fetch(`http://3.24.218.91:5000/read`);
      const data = await response.json();
      setNumStudents(data.length);
    } catch (error) {
      console.error('Error fetching number of students:', error);
    }
  };
  const handleSubmit = () => {
    fetchNumStudents();
    if (numStudents === 0) {
        setSchool(1);
      } else if (numStudents % 4 === 0) {
        setSchool(1);
      } else if (numStudents % 4 === 1) {
        setSchool(2);
      } else if (numStudents% 4 === 2) {
        setSchool(3);
      } else if (numStudents % 4 === 3) {
        setSchool(4);
      }
    if (!fristName || !lastName || !school) {
      setErrorMessage('กดอีกครั้ง เเละรีเฟรสหน้าต่าง เพื่อดูข้อมูลเข้า');
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
      body: JSON.stringify({ id: maxId+1 , fristName:fristName,lastName:lastName,school:school }),
    })
    .then(response => {
      if (response.ok) {
        
        console.log('New student added successfully.');
        window.location.reload();
      } else {
        window.confirm(numStudents);
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
            <button className='popup-buttons' onClick={handleSubmit}>Submit</button>
            <button className='popup-buttons' onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddStudentPopup;
