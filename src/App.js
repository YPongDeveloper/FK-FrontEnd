import React, { useState, useEffect } from 'react';
import './App.css';
import Papa from 'papaparse';
import NumSchool from './components/NumSchool.js'; 
import TableAll from './components/TableAll';
import TableI from './components/TableI';
import TableII from './components/TableII';
import TableIII from './components/TableIII';
import TableIV from './components/TableIV';
import AllNum from './components/AllNum';
import FKimage from './images/4king.jpg';
import AddStudentPopup from './components/AddStudentPopup';
import ExportCSV from './components/ExportCSV';
import ImportCsv from './components/ImportCsv';

const AddNumberPopup = ({ onSubmit, onCancel ,limitSchool1,limitSchool2,limitSchool3,limitSchool4 }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
   
    if (inputValue && /^\d+$/.test(inputValue)) {
      onSubmit(parseInt(inputValue)); 
      setInputValue(''); 
    } else {
      alert('Please enter a valid number.'); 
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2 style={{color:"White"}}>Add Number</h2>
        <input
          type="number"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter number of new students"
        />
        <div className="popup-buttons">
          <button onClick={handleSubmit}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
function App() {
  const [selectedTable, setSelectedTable] = useState('TableAll');
  const [showPopup, setShowPopup] = useState(false);
  
  const [totalStudents, setTotalStudents] = useState(0); 
  const [createMode, setCreateMode] = useState(false);
  const [isPopupOpenAddNum , setIsPopupOpenAddNum ] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpenC, setIsPopupOpenC] = useState(false);
  const [data, setData] = useState([]);
  const [numStudents, setNumStudents] = useState(0);
  const [numInput, setNumInput] = useState(0);
  const [limitSchool1, setLimitSchool1] = useState(0);
  const [limitSchool2, setLimitSchool2] = useState(0);
  const [limitSchool3, setLimitSchool3] = useState(0);
  const [limitSchool4, setLimitSchool4] = useState(0);
  const [maxId, setMaxId] = useState(0);
  const [school, setSchool] = useState();

  
  
  const handleAddStudentOpen = () => {
    setIsPopupOpenC(true);
  };

  const handleAddStudentclse = () => {
    setIsPopupOpenC(false);
  };
  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  const openPopupAdd = () => {
    setIsPopupOpen(true);
  };

  const closePopupAdd = () => {
    setIsPopupOpen(false);
  };
  const handleAddNumber = (number) => {
  
    console.log('Added number:', number);
    setNumInput(prevNumInput => prevNumInput + number);
    setNumStudents(prevNumStudents=>prevNumStudents+numInput);
    distributeStudents(numStudents)
    
    closePopup();
  };
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
  }, []); 
  
  useEffect(() => {
    distributeStudents(numStudents);
  }, [numStudents]); 
  const distributeStudents = (total) => {
    const avgStudents = Math.floor(total / 4);
    const remainder = total % 4;

    
    const distributedStudents = [];
    for (let i = 0; i < 4; i++) {
      distributedStudents.push(i < remainder ? avgStudents + 1 : avgStudents);
    }
   
   
    setLimitSchool1(distributedStudents[0]);
    setLimitSchool2(distributedStudents[1]);
    setLimitSchool3(distributedStudents[2]);
    setLimitSchool4(distributedStudents[3]);
    
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      complete: function(results) {
        console.log(results.data); 
        const { data } = results;
        rerun();
       
        postData(data);
      }
    });
  };
  const rerun=()=>{
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
    

      fetch('http://3.24.218.91:5000/students')
      .then(response => response.json())
      .then(data => {
       
        let maxId = 0;
        data.forEach(student => {
          if (student.id > maxId) {
            maxId = student.id;
          }
        });
        
        setMaxId(maxId);
      })
  };
  const postData = async (data) => {
    try {
      const idResponse = await fetch('http://3.24.218.91:5000/students');
      const idData = await idResponse.json();
      const maxId = Math.max(...idData.map(item => item.id));
  
      for (let i = 0; i < data.length; i++) {
        const { fristName, lastName } = data[i];
        const response = await fetch('http://3.24.218.91:5000/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            id: maxId + i + 1, 
            fristName:fristName, 
            lastName: lastName, 
            school: school 
          })
        });
        
        if (response.ok) {
          console.log('Data successfully posted');
        } else {
          console.error('Failed to post data');
        }
      }
  
      rerun();
    } catch (error) {
      console.error('Error:', error);
      window.location.reload();
    }
  };
  
  return (
    <div className="container">
      {showPopup && (
        <AddNumberPopup onCancel={closePopup} onSubmit={handleAddNumber} />
      )}
{isPopupOpen && <AddStudentPopup onConfirm={handleAddStudentOpen} onCancel={handleAddStudentclse} total={school}  />}
      {/* {createMode && <ForCreate numStudents={totalStudents} />} */}
      {/* <button className="numberButton" onClick={openPopup}>Add Students</button> */}
      <button className="csvButton">
        Import .csv
        <ImportCsv/>
        {/* <input className='CSV' type='file' accept=".csv" onChange={handleFileUpload}/> */}
      </button>
      
      <button className="exportCsvButton">Export .csv<ExportCSV /></button>
      <button className="newStudentButton" onClick={openPopupAdd}>
        +New Student
      </button>
      <img className="images" src={FKimage} alt="FK" />
      <div className="grayBackground"></div>
      <div className="studentCount">Total Students: {numStudents}</div>
      <div className="nameButtons">
        <button className="nameButton1" onClick={() => setSelectedTable('TableAll')}>
          All Students <AllNum />
        </button>
        <button className="nameButton2" onClick={() => setSelectedTable('TableI')}>
          ประชาชื่น   <NumSchool school={1} /> 
        </button>
        <button className="nameButton3" onClick={() => setSelectedTable('TableII')}>
          อินทร   <NumSchool school={2} />  
        </button>
        <button className="nameButton4" onClick={() => setSelectedTable('TableIII')}>
          กนกอาชีวะ   <NumSchool school={3} />
        </button>
        <button className="nameButton5" onClick={() => setSelectedTable('TableIV')}>
          บูรณพล   <NumSchool school={4} /> 
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
