import React, { useEffect } from 'react';

function RenewAll() {
  useEffect(() => {
    const updateAllStudents = async () => {
      try {
        const response = await fetch('http://3.24.218.91:5000/students');
        if (!response.ok) {
          throw new Error('Failed to fetch students data');
        }

        const students = await response.json();
        const updatedStudents = students.map((student, index) => {
          const newSchool = (index % 4) + 1;
          return { ...student, school: newSchool };
        });

        await Promise.all(updatedStudents.map(async (student) => {
          await fetch(`http://3.24.218.91:5000/update/${student.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ school: student.school }),
          });
        }));
       
        console.log('All students updated successfully');
      } catch (error) {
        console.error('Error updating all students:', error);
      }
    };


    updateAllStudents();
  }, []); 
  return null;
}

export default RenewAll;
