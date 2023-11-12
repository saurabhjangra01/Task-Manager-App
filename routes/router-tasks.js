const express = require('express');
const router = express.Router();

const { getAllTasks, getTask, createTask, editTask, deleteTask } = require('./../controllers/tasks');

// routes

router.get('/',       getAllTasks);           // get all tasks
router.post('/',      createTask);            // create a task
router.get('/:id',    getTask);               // get a single task
router.patch('/:id',  editTask);              // edit a task
router.delete('/:id', deleteTask);            // delete a task


// another way of routing
// router.route('/').get(getAllTasks).post(createTask);
// router.route('/:id').get(getTask).patch(editTask).delete(deleteTask);

module.exports = router;