const express = require('express');
const cors = require('cors');
const app = express();
const tasksRoutes = require('./routes/tasks');

app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());  

app.use('/api/tasks', tasksRoutes);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});