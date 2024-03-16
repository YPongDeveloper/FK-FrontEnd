import React, { useState } from 'react';
import './InputNum.css';
function InputNum({ onClose, onConfirm }) {
  const [numStudents, setNumStudents] = useState('');

  const handleChange = (event) => {
    setNumStudents(event.target.value);
  };

  const handleConfirm = () => {
    if (numStudents === '' || parseInt(numStudents) === 0) {
      alert('Please enter a valid number of students.');
      return;
    }
    onConfirm(parseInt(numStudents));
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup_inner">
        <h1 style={{color:"white"}}>Number of Students</h1>
        <input
        className='InputN'
          type="number"
          value={numStudents}
          onChange={handleChange}
          placeholder="Number of students..."
        />
        <button className='buttonCon' onClick={handleConfirm}>ยืนยัน</button>
        <button className='buttonCen' onClick={onClose}>ยกเลิก</button>
      </div>
    </div>
  );
}

export default InputNum;
