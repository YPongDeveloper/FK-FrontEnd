import React, { useState, useEffect } from 'react';

function AllNum() {
  const [numStudents, setNumStudents] = useState(0);

  useEffect(() => {
    const fetchNumStudents = async () => {
      try {
        const response = await fetch(`http://3.24.218.91:5000/read`);
        const data = await response.json();
        setNumStudents(data.length);
      } catch (error) {
        console.error('Error fetching number of students:', error);
      }
    };

    fetchNumStudents();
  }, []); // เรียกใช้งานเมื่อ school เปลี่ยนแปลง

  return numStudents; // ส่งคืนจำนวนนักเรียนในรูปแบบตัวเลขเท่านั้น
}

export default AllNum;
