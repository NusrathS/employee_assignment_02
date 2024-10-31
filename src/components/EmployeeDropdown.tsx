import React from 'react'; // Import React library

// Define the props type for the EmployeeDropdown component
interface EmployeeDropdownProps {
  employees: string[]; // Array of employee names passed as a prop
  onSelectEmployee: (employee: string) => void; // Function to handle employee selection, passed as a prop
}

// Create the EmployeeDropdown functional component
const EmployeeDropdown: React.FC<EmployeeDropdownProps> = ({ employees, onSelectEmployee }) => {
  // Handle change event when an employee is selected from the dropdown
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectEmployee(event.target.value); // Call the onSelectEmployee function with the selected employee value
  };

  return (
    <div className="employee-dropdown"> {/* Container for the dropdown */}
      <label>Select Employee:</label> {/* Label for the dropdown */}
      <select onChange={handleSelect}> {/* Dropdown menu that triggers handleSelect on change */}
        <option value="">--Select Employee--</option> {/* Default option */}
        {employees.map((employee, index) => ( // Map through the employees array to create options
          <option key={index} value={employee}> {/* Option element for each employee */}
            {employee} {/* Display employee name */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EmployeeDropdown; // Export the EmployeeDropdown component for use in other files
