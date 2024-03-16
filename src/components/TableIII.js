import './TableAll.css'
import EditImage from "../images/pen.png";
import DeleteImage from "../images/bin.png";
import React, { useState, useEffect } from 'react';
import EditStudent from './EditStudent';


function TableIII() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetch('http://3.24.218.91:5000/read/school/3')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  const mapSchool = (school) => {
    switch (school) {
      case 1:
        return "ประชาชื่น";
      case 2:
        return "อินทร";
      case 3:
        return "กนกอาชีวะ";
      case 4:
        return "บูรณพล";
      default:
        return school;
    }
  };
  const updateSchools = () => {
    const updatedStudents = students.map(student => {
      let updatedStudent = { ...student };
      if (updatedStudent.school < 4) {
        updatedStudent.school += 1;
      } else {
        updatedStudent.school = 1;
      }
      return updatedStudent;
    });
  
    // ทำการส่งคำร้องขอ PUT เพื่ออัปเดตข้อมูลในรายการ
    updatedStudents.forEach(updatedStudent => {
      fetch(`http://3.24.218.91:5000/update/${updatedStudent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStudent),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Updated data:', data);
        // ไม่ต้องทำอะไรเพิ่มเนื่องจากเราไม่ต้องการรีเฟรชหน้าเว็บหลังจากการอัปเดต
      })
      .catch(error => console.error('Error updating student:', error));
    });
  };
  
  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowPopup(true);
  };

  const handleConfirmEdit = (editedStudent) => {
    fetch(`http://3.24.218.91:5000/update/${editedStudent.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedStudent),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Updated data:', data);
      setShowPopup(false);
      setEditingStudent(null);
      window.location.reload();
    })
    .catch(error => console.error('Error updating student:', error));
  };

  const handleCancelEdit = () => {
    setShowPopup(false);
    setEditingStudent(null);
  };
  
  const handleDelete = (id) => {
    if (window.confirm("คุณต้องการลบข้อมูลนี้ใช่หรือไม่?")) {
      fetch(`http://3.24.218.91:5000/delete/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          console.log(`Deleted data with ID: ${id}`);
          setStudents(students.filter(student => student.id !== id));
          updateSchools();
        } else {
          console.error(`Failed to delete data with ID: ${id}`);
        }
      })
      .catch(error => console.error('Error deleting student:', error));
    }
  };

  return (
    <table className='tableContainer'>
      <thead>
        <tr>
          <th className='th'>ชื่อ</th>
          <th className='th'>นามสกุล</th>
          <th className='th'>โรงเรียน</th>
          <th className='th'>แก้ไข</th>
          <th className='th'>ลบ</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td className='td'>{student.fristName}</td>
            <td className='td'>{student.lastName}</td>
            <td className='td'>{mapSchool(student.school)}</td>
            <td className='td'>
              <button className='buttonEdit' onClick={() => handleEdit(student)}>
                <img className='editeIma' src={EditImage} />
              </button>
            </td>
            <td className='td'>
              <button className='buttonDelete' onClick={() => handleDelete(student.id)}>
                <img className='deleteIma' src={DeleteImage} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      {showPopup && (
        <EditStudent student={editingStudent} onConfirmEdit={handleConfirmEdit} onCancelEdit={handleCancelEdit} />
      )}
    </table>
  );
}

export default TableIII;
