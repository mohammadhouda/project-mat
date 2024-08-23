import React, { Fragment, useState } from 'react';
import './UserPage.css';
// import logo from '../../assets/Images/logo.png';
import TableRow from '../TableRow/TableRow';
import {Header, Footer} from '../index'

// const Header = () => (
//   <header className="header">
//     <img src={logo} alt="Company Logo" className="logo-admin" />
//     <h1 className="header-title">Time Card Page</h1>
//   </header>
// );

const UserPage = () => {
  
  const projectTasks = {
    'ICS': ['Portal 1', 'Engine 1', 'Auto 1'],
    'CLNTS': ['Portal 2', 'Engine 2', 'Auto 2']
  };
  
  const [selectedProject, setSelectedProject] = useState('');
  const [availableTasks, setAvailableTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState('');
  const [tableData, setTableData] = useState([]);

  const handleProjectChange = (event) => {
    const project = event.target.value;
    setSelectedProject(project);
    setAvailableTasks(projectTasks[project] || []);
    setSelectedTask(''); // to clear selected task when project changes
  };

  const handleTaskChange = (event) => {
    setSelectedTask(event.target.value);
  };

  const handleAddClick = () => {
    if (selectedProject && selectedTask) {
      setTableData([
        ...tableData,
        {
          project: selectedProject,
          task: selectedTask,
          monday: '',
          tuesday: '',
          wednesday: '',
          thursday: '',
          friday: '',
          saturday: '',
          sunday: '',
        },
      ]);

      setSelectedProject('');
      setAvailableTasks([]);
      setSelectedTask('');
    } else {
      alert('Please select both a project and a task');
    }
  };

  const handleHoursChange = (index, day, value) => {
    const newTableData = [...tableData];
    newTableData[index][day] = value;
    setTableData(newTableData);
  };

  const handleSubmit = () => {
    if (tableData.length === 0) {
      alert('The table is empty. Please add data before submitting.');
      return;
    }

    console.log('Table Data:', tableData);
    alert('Data submitted!');
  };

  return (
    <Fragment>
      <Header />
      <div className="container">
        <div className="dropdown">
          <label>Project</label>
          <select value={selectedProject} onChange={handleProjectChange}>
            <option value="" disabled>Select a project</option>
            {Object.keys(projectTasks).map((project, index) => (
              <option key={index} value={project}>
                {project}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown">
          <label>Task</label>
          <select value={selectedTask} onChange={handleTaskChange} disabled={!availableTasks.length}>
            <option value="" disabled>Select a Task</option>
            {availableTasks.map((task, index) => (
              <option key={index} value={task}>
                {task}
              </option>
            ))}
          </select>
        </div>

        <div className='button-container'>
          <button onClick={handleAddClick}>Add</button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Task</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
                <th>Sunday</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <TableRow
                  key={index}
                  row={row}
                  index={index}
                  onHoursChange={handleHoursChange}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="submit-container">
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default UserPage;
