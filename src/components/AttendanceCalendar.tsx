import React, { useState, useMemo } from 'react'; // Import React and necessary hooks
import '../App.css'; // Import CSS styles for the component

// Define the structure for each day in the calendar
interface CalendarDay {
  date: string; // Date in ISO format
  status: 'Present' | 'Absent' | ''; // Status of attendance for the day
}

// Define the props type for the AttendanceCalendar component
interface AttendanceCalendarProps {
  employee: string; // Name of the employee
  attendanceData: { date: string; status: 'P' | 'A' }[]; // Array of attendance records
}

// Create the AttendanceCalendar functional component
const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({ employee, attendanceData }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date()); // State to track the currently displayed month

  // Function to generate an array of days for the current month
  const generateMonthDays = (month: Date): CalendarDay[] => {
    const year = month.getFullYear(); // Get the current year
    const monthIndex = month.getMonth(); // Get the current month index (0-11)

    // Get the first day of the month
    const firstDay = new Date(year, monthIndex, 1);
    // Get the last day of the month
    const lastDay = new Date(year, monthIndex + 1, 0);

    const days: CalendarDay[] = []; // Initialize an array to hold the days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) { // Loop through each day of the month
      const date = new Date(year, monthIndex, day).toISOString().split('T')[0]; // Format date to ISO string

      // Check if the date exists in the attendance data
      const attendance = attendanceData.find(record => record.date === date); // Find the attendance record for the date
      days.push({
        date,
        status: attendance ? (attendance.status === 'P' ? 'Present' : 'Absent') : '', // Set status based on attendance data
      });
    }

    return days; // Return the array of days
  };

  // Memoize the month days to optimize rendering
  const monthDays = useMemo(() => generateMonthDays(currentMonth), [currentMonth, attendanceData]);

  // Function to go to the previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)); // Update state to the previous month
  };

  // Function to go to the next month
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)); // Update state to the next month
  };

  return (
    <div className="attendance-calendar"> {/* Container for the calendar */}
      <div className="calendar-navigation"> {/* Navigation for the calendar */}
        <button onClick={goToPreviousMonth}>{"<"}</button> {/* Button to navigate to the previous month */}
        <h3>
          Attendance for {employee} - {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()} {/* Display current employee and month */}
        </h3>
        <button onClick={goToNextMonth}>{">"}</button> {/* Button to navigate to the next month */}
      </div>
      <table className="attendance-table"> {/* Table to display the calendar */}
        <thead> {/* Header of the table */}
          <tr>
            <th>Sun</th> {/* Sunday column */}
            <th>Mon</th> {/* Monday column */}
            <th>Tue</th> {/* Tuesday column */}
            <th>Wed</th> {/* Wednesday column */}
            <th>Thu</th> {/* Thursday column */}
            <th>Fri</th> {/* Friday column */}
            <th>Sat</th> {/* Saturday column */}
          </tr>
        </thead>
        <tbody>
          {/* Render the calendar dynamically in a grid format */}
          {Array.from({ length: 6 }).map((_, weekIndex) => ( // Loop through 6 weeks
            <tr key={weekIndex}> {/* Row for each week */}
              {Array.from({ length: 7 }).map((_, dayIndex) => { // Loop through 7 days
                const day = monthDays[weekIndex * 7 + dayIndex]; // Get the day for the current week and day index
                return (
                  <td
                    key={dayIndex} // Key for each day cell
                    className={`day ${day ? day.status.toLowerCase() : ''}`} // Set class based on attendance status
                  >
                    {day ? new Date(day.date).getDate() : ''} {/* Display the day number or empty if no day */}
                  </td>
                );
              })} 
            </tr>
          ))}
        </tbody>
      </table>
      <div className="legend"> {/* Legend for attendance status */}
        <div className="legend-item present">Present</div> {/* Present status legend item */}
        <div className="legend-item absent">Absent</div> {/* Absent status legend item */}
      </div>
    </div>
  );
};

export default AttendanceCalendar; // Export the AttendanceCalendar component for use in other files
