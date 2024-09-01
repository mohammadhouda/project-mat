import React from 'react';
import './TableRow.css';

const TableRow = ({ row, index, onHoursChange }) => {
  return (
    <tr>
      <td>{row.project}</td>
      <td>{row.task}</td>
      <td><input type="number" value={row.monday || ''} onChange={(e) => onHoursChange(index, 'monday', e.target.value)} /></td>
      <td><input type="number" value={row.tuesday || ''} onChange={(e) => onHoursChange(index, 'tuesday', e.target.value)} /></td>
      <td><input type="number" value={row.wednesday || ''} onChange={(e) => onHoursChange(index, 'wednesday', e.target.value)} /></td>
      <td><input type="number" value={row.thursday || ''} onChange={(e) => onHoursChange(index, 'thursday', e.target.value)} /></td>
      <td><input type="number" value={row.friday || ''} onChange={(e) => onHoursChange(index, 'friday', e.target.value)} /></td>
      <td><input type="number" value={row.saturday || ''} onChange={(e) => onHoursChange(index, 'saturday', e.target.value)} /></td>
      <td><input type="number" value={row.sunday || ''} onChange={(e) => onHoursChange(index, 'sunday', e.target.value)} /></td>
    </tr>
  );
};

export default TableRow;
