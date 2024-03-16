import React, { useState } from 'react';
import './App.css';
import ForCreate from './components/ForCreate';
import InputNum from './components/InputNum';
import NumSchool from './components/NumSchool.js'; 
import TableAll from './components/TableAll';
import TableI from './components/TableI';
import TableII from './components/TableII';
import TableIII from './components/TableIII';
import TableIV from './components/TableIV';
import AllNum from './components/AllNum';
import FKimage from './images/4king.jpg';

function App() {
  const [selectedTable, setSelectedTable] = useState('TableAll');
  const [showPopup, setShowPopup] = useState(false);
  const [numStudents, setNumStudents] = useState(0);
  const [createMode, setCreateMode] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleConfirmNumStudents = (num) => {
    setNumStudents(num);
    setCreateMode(true); // เมื่อยืนยันจำนวนนักเรียนแล้วให้เปลี่ยนเป็นโหมดสร้างนักเรียน
    setShowPopup(false); // ปิดป็อปอัพเลือกจำนวนนักเรียน
  };

  return (
    <div className="container">
      {showPopup && (
        <InputNum onClose={closePopup} onConfirm={handleConfirmNumStudents} />
      )}

      {/* เรียกใช้ ForCreate เมื่ออยู่ในโหมดสร้างนักเรียน */}
      {createMode && <ForCreate numStudents={numStudents} />}
      
      <button className="csvButton">Import .csv</button>
      <button className="exportCsvButton">Export .csv</button>
      <button className="newStudentButton" onClick={openPopup}>
        +New Student
      </button>
      <img className="images" src={FKimage} alt="FK" />
      <div className="grayBackground"></div>
      <div className="studentCount">จำนวนนักเรียนทั้งหมด: {numStudents}</div>
      <div className="nameButtons">
        <button className="nameButton1" onClick={() => setSelectedTable('TableAll')}>
          All Students <AllNum />
        </button>
        <button className="nameButton2" onClick={() => setSelectedTable('TableI')}>
          ประชาชื่น <NumSchool school={1} />
        </button>
        <button className="nameButton3" onClick={() => setSelectedTable('TableII')}>
          อินทร <NumSchool school={2} />
        </button>
        <button className="nameButton4" onClick={() => setSelectedTable('TableIII')}>
          กนกอาชีวะ <NumSchool school={3} />
        </button>
        <button className="nameButton5" onClick={() => setSelectedTable('TableIV')}>
          บูรณพล <NumSchool school={4} />
        </button>

        {selectedTable === 'TableAll' && <TableAll />}
        {selectedTable === 'TableI' && <TableI />}
        {selectedTable === 'TableII' && <TableII />}
        {selectedTable === 'TableIII' && <TableIII />}
        {selectedTable === 'TableIV' && <TableIV />}
      </div>
    </div>
  );
}

export default App;
