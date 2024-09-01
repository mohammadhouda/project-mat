import React, { useEffect, useState } from 'react';
import './UserPage.css';
import TableRow from '../TableRow/TableRow';


const UserPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [fixedDates, setFixedDates] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [availableTasks, setAvailableTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState('');
  const [tableData, setTableData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  };

 
  const getWeekDates = (date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); 
    const startOfWeek = new Date(start.setDate(diff));
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDates.push(formatDate(day));
    }
    return weekDates;
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    setFixedDates(getWeekDates(date)); 
    setSelectedProject(''); 
    setAvailableTasks([]);
    setSelectedTask('');
  };

  const handleProjectChange = async (event) => {
    const project = event.target.value;
    setSelectedProject(project);
    setSelectedTask('');
    setAvailableTasks([]);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('No authentication token found.');
      return;
    }

    try {
      const response = await fetch(`/mat/api/1.0/private/projects/${encodeURIComponent(project)}/tasks`, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setAvailableTasks(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setError('Failed to fetch tasks for the selected project');
    }
  };

  const handleTaskChange = (event) => {
    setSelectedTask(event.target.value);
  };

  const handleAddClick = () => {
    if (selectedDate && selectedProject && selectedTask) {
      setTableData([
        ...tableData,
        {
          project: selectedProject,
          task: selectedTask,
          monday: fixedDates[0],
          tuesday: fixedDates[1],
          wednesday: fixedDates[2],
          thursday: fixedDates[3],
          friday: fixedDates[4],
          saturday: fixedDates[5],
          sunday: fixedDates[6],
        },
      ]);

      setSelectedProject('');
      setAvailableTasks([]);
      setSelectedTask('');
    } else {
      alert('Please select a date, project, and task');
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

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found.');
        return;
      }

      try {
        const response = await fetch(`/mat/api/1.0/private/projects`, {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setError('Failed to fetch projects');
      }
    };

    fetchProjects();
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        {error && <div className="error-message">{error}</div>}

        <div className="dropdown">
          <label>Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            disabled={selectedDate !== ''} 
          />
        </div>

        <div className="dropdown">
          <label>Project</label>
          <select
            value={selectedProject}
            onChange={handleProjectChange}
            disabled={!selectedDate}
          >
            <option value="" disabled>Select a project</option>
            {projects.map((project, index) => (
              <option key={index} value={project.name}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown">
          <label>Task</label>
          <select
            value={selectedTask}
            onChange={handleTaskChange}
            disabled={!availableTasks.length}
          >
            <option value="" disabled>Select a Task</option>
            {availableTasks.map((task, index) => (
              <option key={index} value={task.name}>
                {task.name}
              </option>
            ))}
          </select>
        </div>

        <div className='button-container'>
          <button onClick={handleAddClick} disabled={!selectedDate || !selectedProject || !selectedTask}>Add</button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Task</th>
                {fixedDates.map((date, index) => (
                  <th key={index}>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][index]}<br />
                    {date}
                  </th>
                ))}
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


    </React.Fragment>
  );
};

export default UserPage;
