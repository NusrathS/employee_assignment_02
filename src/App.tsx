import React, { useState } from 'react'; // Import React and useState hook
import EmployeeDropdown from './components/EmployeeDropdown'; // Import EmployeeDropdown component
import AttendanceCalendar from './components/AttendanceCalendar'; // Import AttendanceCalendar component

// Define the type for attendance data
interface AttendanceRecord {
  date: string; // The date of attendance
  status: 'P' | 'A'; // P for Present, A for Absent
}

// Define the type for attendance data keyed by employee name
interface AttendanceData {
  [key: string]: AttendanceRecord[]; // Maps employee names to their attendance records
}

const App: React.FC = () => { // Main App component
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null); // State to track the selected employee

  // Mock data for employees
  const employees = ['Nusrath', 'Abhishek', 'Omkar', 'Sheetal']; // List of employee names

  // Sample attendance data for each employee
  const attendanceData: AttendanceData = {
    Nusrath: [ // Attendance records for Nusrath
      { date: '2024-10-07', status: 'P' }, // Present on 2024-10-07
      { date: '2024-10-18', status: 'A' }, // Absent on 2024-10-18
      { date: '2024-11-14', status: 'A' }, // Absent on 2024-11-14
    ],
    Abhishek: [ // Attendance records for Abhishek
      { date: '2024-10-01', status: 'A' }, // Absent on 2024-10-01
      { date: '2024-10-05', status: 'P' }, // Present on 2024-10-05
      { date: '2024-12-14', status: 'A' }, // Absent on 2024-12-14
      { date: '2024-11-14', status: 'A' }, // Absent on 2024-12-14
    ],
    Omkar: [ // Attendance records for Omkar
      { date: '2024-10-10', status: 'P' }, // Present on 2024-10-10
      { date: '2024-10-13', status: 'A' }, // Absent on 2024-10-13
    ],
    Sheetal: [ // Attendance records for Sheetal
      { date: '2024-10-23', status: 'P' }, // Present on 2024-10-23
      { date: '2024-10-14', status: 'A' }, // Absent on 2024-10-14
      { date: '2024-01-14', status: 'A' }, // Absent on 2024-01-14
    ],
  };

  // Function to handle employee selection from the dropdown
  const handleEmployeeSelect = (employee: string) => {
    setSelectedEmployee(employee); // Update the selected employee state
  };

  return (
    <div className="app"> {/* Main application container */}
      <EmployeeDropdown employees={employees} onSelectEmployee={handleEmployeeSelect} /> {/* Render the dropdown */}
      {selectedEmployee && ( // Render the AttendanceCalendar only if an employee is selected
        <AttendanceCalendar 
          employee={selectedEmployee} // Pass the selected employee
          attendanceData={attendanceData[selectedEmployee] || []} // Provide attendance data or an empty array
        />
      )}
    </div>
  );
};

export default App; // Export the App component for use in other parts of the application
