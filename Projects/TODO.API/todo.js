const express = require('express');
const app = express();

// Enable JSON parsing middleware for request bodies
app.use(express.json());

// In-memory array of TODO, Each to-do item has a description, due date, and whether it is completed or not.
const TODO = [
    {id: 1, description: 'do HW', dueDate: 'today', completed: false},
    {id: 2, description: 'Walk the dog', dueDate: 'tomorrow', completed: false},
    {id: 3, description: 'buy groceries', dueDate: 'next week', completed: false}
];
// GET: Root endpoint
app.get('/', (req, res) => {
res.send(TODO);});

// GET: Retrieve all courses
app.get('/api/courses', (req, res) => {
    res.send(TODO);
});

// GET: Retrieve a single course by ID
app.get('/api/courses/:id', (req, res) => {
    const course = TODO.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course);
});

// POST: Create a new course
app.post('/api/courses', (req, res) => {
    const todo = {
        id: TODO.length + 1,
        description: req.body.description,
        dueDate: req.body.dueDate,
        completed: req.body.completed
    };
    TODO.push(todo);
    res.send(todo);
});

// PUT: Update an existing course
app.put('/api/courses/:id', (req, res) => {
    const course = TODO.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    course.description = req.body.description;
    course.dueDate = req.body.dueDate;
    course.completed = req.body.completed;
    res.send(course);
});

// DELETE: Delete a course by ID
app.delete('/api/courses/:id', (req, res) => {
    const course = TODO.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    const index = TODO.indexOf(course);
    TODO.splice(index, 1);

    res.send(course);
});

// Environment port configuration or dynamic fallback to 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

