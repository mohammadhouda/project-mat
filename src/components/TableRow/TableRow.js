import React from 'react';
import './TableRow.css'


const TableRow = ({ row, index, onHoursChange }) => (
  <tr>
    <td>{row.project}</td>
    <td>{row.task}</td>
    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
      <td key={day}>
        <input
          type="number"
          value={row[day]}
          onChange={(e) => onHoursChange(index, day, e.target.value)}
          min="0"
          step="0.5" // to allows decimal values
        />
      </td>
    ))}
  </tr>
);

export default TableRow;
