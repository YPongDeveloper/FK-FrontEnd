import React, { useState } from 'react';

function EditStudent({ student, onConfirmEdit, onCancelEdit }) {
  const [editingStudent, setEditingStudent] = useState(student);

  const handleConfirmEdit = () => {
    onConfirmEdit(editingStudent);
  };

  const handleCancelEdit = () => {
    onCancelEdit();
  };

  return (
    <div className="popup">
      <div className="popup-container">
        <h2>Edit Student</h2>
        <p>1: ประชาชื่น   2: อินทร  3: กนกอาชีวะ  4: บูรณพล</p>
        <input
          type="text"
          value={editingStudent.fristName}
          onChange={e => setEditingStudent({...editingStudent, fristName: e.target.value})}
        />
        <input
          type="text"
          value={editingStudent.lastName}
          onChange={e => setEditingStudent({...editingStudent, lastName: e.target.value})}
        />
        {/* <input
  type="text"
  value={editingStudent.school}
  onChange={e => setEditingStudent({...editingStudent})}
/> */}
        <button onClick={handleConfirmEdit}>Confirm</button>
        <button onClick={handleCancelEdit}>Cancel</button>
      </div>
    </div>
  );
}

export default EditStudent;
