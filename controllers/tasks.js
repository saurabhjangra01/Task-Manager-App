const Task = require('../models/taskModel');
const asyncWrapper = require('../middlewares/async');
const { createCustomError } = require('./../errors/errors');

// function without try catch

const getAllTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
});

/*
* Same function with try catch

async function getAllTasks(req, res){
    try{
        const tasks = await Task.find({});
        res.status(200).json({ tasks });
    }
    catch(error){
        res.status(500).json({
            message: error.message || "bad request",
            error: error
        });
    }
}
*/

const getTask = asyncWrapper( async(req, res, next) => {
    const { id: taskId } = req.params;

    const task = await Task.findOne({_id: taskId});
    if(!task) {
        return next(createCustomError(`No task with ID: ${taskId}`, 404));
    }

    res.status(200).json({ task });
});

/*
async function getTask(req, res){
    try{
        const { id: taskId } = req.params;
        const task = await Task.findOne({_id: taskId});
        if(!task){
            return res.status(404).json({ message: `No task found with ID: ${taskId}` });
        }

        res.status(200).json({ task });
    }
    catch(error){
        res.status(500).json({
            message: error.message || "bad request",
            error: error
        });
    }
}
*/

const createTask = asyncWrapper( async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
});

/*
async function createTask(req, res){
    try{
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    }
    catch(error){
        res.status(500).json({
            message: error.message || "bad request",
            error: error
        });
    }
}
*/

const deleteTask = asyncWrapper( async (req, res, next) => {
    const { id: taskId } = req.params;

    const task = await Task.findOneAndDelete({_id: taskId});
    if(!task){
        return next(createCustomError(`No task with ID: ${taskId}`, 404));
    }
    
    res.status(200).send({message: `Task ${taskId} deleted successfully.`});
});

/*
async function deleteTask(req, res){
    try{
        const { id: taskId } = req.params;
        const task = await Task.findOneAndDelete({_id: taskId});
        if(!task){
            return res.status(404).json({ message: `No task found with ID: ${taskId}` });
        }
        res.status(200).send({message: `Task ${taskId} deleted successfully.`});
    }
    catch(error){
        res.status(500).json({
            message: error.message || "bad request",
            error: error
        });
    }
}
*/

const editTask = asyncWrapper( async (req, res, next) => {

    const { id: taskId } = req.params;
    const options = {
        new: true,              // returns the new updated value
        runValidators: true     // makes the query run through validators
    };

    const task = await Task.findOneAndUpdate({_id: taskId}, req.body, options);
    if(!task){
        return next(createCustomError(`No task with ID: ${taskId}`, 404));
    }

    res.status(200).json({ task });
});

/*
async function editTask(req, res){
    try{
        const { id: taskId } = req.params;
        
        /* 
            this query is going to return the old document even after updateing the document and it also does not run through the validators

            const task = await Task.findOneAndUpdate({_id: taskId}, req.body);  
        *//*

        // to avoid this, we use the options object

        const options = {
            new: true,              // returns the new updated value
            runValidators: true     // makes the query run through validators
        };

        const task = await Task.findOneAndUpdate({_id: taskId}, req.body, options);
        
        if(!task){
            return res.status(404).json({ message: `No task found with ID: ${taskId}` });
        }

        res.status(200).json({ task });
    }
    catch(error){
        res.status(500).json({
            message: error.message || "bad request",
            error: error
        });
    }
}
*/


module.exports = {
    getAllTasks,
    getTask,
    createTask,
    editTask,
    deleteTask
}