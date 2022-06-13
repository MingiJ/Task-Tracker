// @desc gets  tasks
// access Private
// route GET /api/tasks
const asyncHandler = require('express-async-handler')
const Task = require('../models/taskModel')
const User = require('../models/userModel')

const getTasks = asyncHandler(async (req, res) =>{
    const task = await Task.find({user: req.user.id})
    res.send(task)
})

// @desc creates a task
// access Private
// route POST /api/tasks
const createTask = asyncHandler(async (req, res) =>{
    const {title, message, category} = req.body
    if(!title ||!message || !category){
        res.status(400)
        throw new Error("Please input all the fields")
    }
    const task = await Task.create({
        title,
        message,
        user: req.user.id,
        category
    })
    res.status(201).json(task)
})

// @desc updates a task
// access Private
// route PUT /api/task
const updateTask = asyncHandler(async (req, res) =>{
    const task = await Task.findById(req.params.id)
    if(!task){
        res.status(400).json({message: "Task does not exist"})
    }
    const user = await User.findById(req.user.id)
    console.log(task.user)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    if(task.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedTask)
})

// @desc deletes a task
// access Private
// route DELETE /api/tasks
const deleteTask = asyncHandler(async (req, res) =>{
    const task = Task.findById(req.params.id)
    if(!task){
        res.status(400).json({message: "Task does not exist"})
    }
    await task.remove()
    res.json({id:`${req.params.id}`})
})


module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
}