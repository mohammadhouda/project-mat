import { jwtDecode } from 'jwt-decode';
import TableRow from '../TableRow/TableRow';
import React, { useEffect, useState } from 'react';
import './UserPage.css';


const UserPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [fixedDates, setFixedDates] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [availableTasks, setAvailableTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState('');
  const [tableData, setTableData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      console.log('Decoded Token:', decoded);
      return decoded.sub; 
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  

 
  const formatDate = (date) => {
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const milliseconds = date.getUTCMilliseconds();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}T${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}.${milliseconds < 100 ? (milliseconds < 10 ? '00' + milliseconds : '0' + milliseconds) : milliseconds}Z`;
  };

  const getWeekDates = (startDate) => {
    const start = new Date(startDate);
    const startOfWeek = new Date(start);
    startOfWeek.setDate(start.getDate() - start.getDay() + 1); 

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(formatDate(date)); 
    }

    return {
      dateFrom: dates[0],
      dateTo: dates[dates.length - 1],
      dates: dates
    };
  };

  const handleDateChange = (event) => {
    const date = new Date(event.target.value);
    setSelectedDate(formatDate(date));
    setFixedDates(getWeekDates(event.target.value));
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
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const data = await response.json();
      setAvailableTasks(data);
    } catch (error) {
      setError('Failed to fetch tasks for the selected project. ' + error.message);
    }
  };

  const handleTaskChange = (event) => {
    const task = event.target.value;
    setSelectedTask(task);
  };

  const handleAddClick = () => {
    if (selectedDate && selectedProject && selectedTask) {
      const taskId = availableTasks.find(task => task.name === selectedTask)?.id;

      const newRow = {
        project: selectedProject,
        task: selectedTask,
        taskId: taskId,
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
      };

      setTableData([...tableData, newRow]);
      setSelectedProject('');
      setAvailableTasks([]);
      setSelectedTask('');
    } else {
      alert('Please select a date, project, and task');
    }
  };

  const handleHoursChange = (index, day, value) => {
    const newTableData = [...tableData];
    const parsedValue = parseFloat(value) || 0;
    newTableData[index][day] = parsedValue;
    setTableData(newTableData);
  };

  const handleSubmit = async () => {
    if (tableData.length === 0) {
      alert('The table is empty. Please add data before submitting.');
      return;
    }
  
    if (!userEmail) {
      alert('User email is not set. Please try reloading the page.');
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No authentication token found.');
      return;
    }
  
    const weekDates = getWeekDates(selectedDate);
  
    const requestBody = {
      userId: userEmail,
      dateFrom: weekDates.dateFrom,
      dateTo: weekDates.dateTo,
      msg: comment,
      activities: tableData.map(row => {
        return {
          taskId: row.taskId,
          date: row.date,
          duration: row.duration
        };
      }),
    };
  
    console.log('Request Headers:', {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  
    console.log('Request Body:', requestBody);
  
    try {
      const response = await fetch(`/mat/api/1.0/private/reports`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error Response Status:', response.status);
        console.error('Error Response Text:', errorText);
        setError(`Failed to submit data. Status: ${response.status}, Error: ${errorText}`);
        return;
      }
  
      const result = await response.json();
      console.log('Response Data:', result);
      alert('Data submitted successfully!');
    } catch (error) {
      console.error('Error posting report:', error);
      setError(`An error occurred while submitting the data: ${error.message}`);
    }
  };
  
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userId = decodeToken(token);
      if (userId) {
        setUserEmail(userId); 
      } else {
        setError('Failed to decode token or userId not found.');
      }
    } else {
      setError('No authentication token found.');
    }
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found.');
        return;
      }

      try {
        const response = await fetch('/mat/api/1.0/private/projects', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text(); 
          throw new Error(`Network response was not ok: ${errorText}`);
        }

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        setError('Failed to fetch projects. ' + error.message);
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
            value={selectedDate.split('T')[0]} 
            onChange={handleDateChange}
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
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                  <th key={index}>{day}</th>
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

        <div className="comment-section">
          <label>Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
          />
        </div>

        <div className="button-container">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserPage;
