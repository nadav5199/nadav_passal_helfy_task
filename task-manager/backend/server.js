const express = require('express');
const app = express();
const tasksRoutes = require('./routes/tasks');

app.use(express.json());  

app.use('/api/tasks', tasksRoutes);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});