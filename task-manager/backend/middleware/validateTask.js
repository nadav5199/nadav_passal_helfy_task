const validateTaskBody = (req, res, next) => {
    const { title, description, priority } = req.body;


    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Request body is required' });
    }

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    if (typeof title !== 'string') {
        return res.status(400).json({ error: 'Title must be a string' });
    }

    if (title.trim().length === 0) {
        return res.status(400).json({ error: 'Title cannot be empty' });
    }

    if (description !== undefined && typeof description !== 'string') {
        return res.status(400).json({ error: 'Description must be a string' });
    }

    const validPriorities = ['low', 'medium', 'high'];
    if (priority !== undefined && !validPriorities.includes(priority)) {
        return res.status(400).json({ 
            error: `Priority must be one of: ${validPriorities.join(', ')}` 
        });
    }

    next();
};

module.exports = { validateTaskBody };
