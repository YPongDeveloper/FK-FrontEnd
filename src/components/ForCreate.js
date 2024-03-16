import React, { useState } from 'react';
import CreateStudents from './CreateStudents';
import AllNum from './AllNum';

function ForCreate({ numStudents }) {
  const [showCreatePopup, setShowCreatePopup] = useState(true); // เริ่มต้นโชว์ป็อปอัพ CreateStudents ไว้ก่อน

  const handleConfirmCreate = () => {
    // เมื่อ Confirm ในป็อปอัพ CreateStudents ถูกกด
    setShowCreatePopup(false); // ปิดป็อปอัพ CreateStudents
    // ตรวจสอบว่ายังมีโรงเรียนที่ต้องสร้างนักเรียนหรือไม่
    if (numStudents > 0) {
      setShowCreatePopup(true); // โชว์ป็อปอัพ CreateStudents ตัวถัดไป
    }
  };

  const handleCancelCreate = () => {
    // เมื่อ Cancel ในป็อปอัพ CreateStudents ถูกกด
    setShowCreatePopup(false); // ปิดป็อปอัพ CreateStudents
  };

  return (
    <>
      {/* โชว์ป็อปอัพ CreateStudents ถ้า showCreatePopup เป็น true */}
      {showCreatePopup && (
        <CreateStudents
          
          onConfirm={handleConfirmCreate}
          onCancel={handleCancelCreate}
          
        />
      )}
    </>
  );
}

export default ForCreate;
