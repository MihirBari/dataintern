import React, { useState } from 'react';
import axios from 'axios';
import './Form.css'; // Import your CSS file

const Form = ({ updateChartData }) => {
  const [formData, setFormData] = useState({
    accessTime: '',
    accessDate: '',
    employeeName: '',
    filter: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your API endpoint to log the data
      const response = await axios.post('/api/log-chart-data', formData);
      console.log(response.data); // Log the response from the server

      // Request updated chart data from your API and update the chart
      const updatedChartDataResponse = await axios.get('/api/chart-data');
      updateChartData(updatedChartDataResponse.data);

      // Clear the form
      setFormData({
        accessTime: '',
        accessDate: '',
        employeeName: '',
        filter: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="label">
        Access Time : 
        <input
          type="time"
          name="accessTime"
          value={formData.accessTime}
          onChange={handleChange}
          className="input-field"
        />
      </label>
      <label className="label">
        Access Date : 
        <input
          type="date"
          name="accessDate"
          value={formData.accessDate}
          onChange={handleChange}
          className="input-field"
        />
      </label>
      <label className="label">
        Employee Name : 
        <input
          type="text"
          name="employeeName"
          value={formData.employeeName}
          onChange={handleChange}
          className="input-field"
        />
      </label>
      <label className="label">
        Filter :
        <select
          name="filter"
          value={formData.filter}
          onChange={handleChange}
          className="input-field"
        >
<option value="option1">energy_savings</option>
<option value="option2">mitigated_co2</option>
<option value="option2">weather</option>
        </select>
      </label>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default Form;


