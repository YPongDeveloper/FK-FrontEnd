import React, { useState, useEffect } from 'react';

function NumSchool({ school }) {
  const [numStudents, setNumStudents] = useState(0);

  useEffect(() => {
    const fetchNumStudents = async () => {
      try {
        const response = await fetch(`http://3.24.218.91:5000/read/school/${school}`);
        const data = await response.json();
        setNumStudents(data.length);
      } catch (error) {
        console.error('Error fetching number of students:', error);
      }
    };

    fetchNumStudents();
  }, [school]); 

  return numStudents; 
}

export default NumSchool;
