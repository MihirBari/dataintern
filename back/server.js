const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Configure middleware
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
  }));

// Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

const deviceSchema = new mongoose.Schema({
    total_kwh: Number,
    updatedAt: Date,
    ac_run_hrs: Number,
    ac_fan_hrs: Number,
    algo_status: Number,
    billing_amount: Number,
    cost_reduction: Number,
    energy_savings: {
      savings_percent: Number,
      ref_kwh: Number,
      us_meter: Number,
      us_calc: Number,
      inv_factor: Number,
      mitigated_co2: Number,
    },
    weather: {
      max_temp: Number,
      min_temp: Number,
    },
  });
  
  const dataSchema = new mongoose.Schema({
    createdAt: Date,
    serialNo: String,
    clientID: String,
    deviceMapID: String,
    devices: [deviceSchema],
  });
  
  const DataModel = mongoose.model('Data', dataSchema);
  

// Define your API routes
app.get('/api/chart-data', async (req, res) => {
  try {
    const data = await DataModel.find({});
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/log-chart-data', async (req, res) => {
    try {
      // Extract data from the request body
      const { accessTime, accessDate, employeeName, filter } = req.body;
  
      // Log the data into a MongoDB collection
      const logEntry = {
        accessTime,
        accessDate,
        employeeName,
        filter,
        timestamp: new Date(),
      };
  
      // Store the log entry in your MongoDB collection
      const result = await db.collection('ChartDataLogs').insertOne(logEntry);
  
      // Respond with the inserted log entry
      res.json(result.ops[0]);
    } catch (error) {
      console.error('Error logging chart data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});