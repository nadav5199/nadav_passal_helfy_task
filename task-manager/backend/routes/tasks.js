const express = require('express');
const router = express.Router();
const { validateTaskBody } = require('../middleware/validateTask');

// in-memory database
let tasks = [];
let nextId = 1;

// routes
router.get('/', (req, res) => {
    res.json(tasks);
});

router.post('/', validateTaskBody, (req, res) => {
    const { title, description, priority } = req.body;
    const newTask = { id: nextId++, title, completed: false, description, createdAt: new Date(), priority };
    tasks.push(newTask);
    res.status(201).json(newTask);
});


router.put('/:id', validateTaskBody, (req, res) => {
    const { id } = req.params;
    const { title, description, priority } = req.body;
    const task = tasks.find(task => task.id === parseInt(id));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    task.title = title;
    task.description = description;
    task.priority = priority;
    res.json(task);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const task = tasks.find(task => task.id === parseInt(id));

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks = tasks.filter(task => task.id !== parseInt(id));
    res.status(200).send();
});

router.patch('/:id/toggle', (req, res) => {
    const { id } = req.params;
    const task = tasks.find(task => task.id === parseInt(id));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    task.completed = !task.completed;
    res.json(task);
});

module.exports = router;