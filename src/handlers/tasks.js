'use strict'
require('../database')
const Task = require('../models/tasks')

async function createTask (req ,h ){
    try{
       const task = new Task(req.payload)
       const taskCreated = await task.save()
       return h.response(taskCreated).code(201)
    }catch (err){
       return h.response(err).code(500)
    }
}

async function getTasks (req,h){
    try{
        const tasks =  await Task.find()
        return h.response(tasks).code(200)
    }catch(err){
        return h.response(err).code(404)
    }
}

async function getTask (req,h){
    try{
        const task =  await Task.findById(req.params.id)
        return h.response(task).code(200)
    }catch (err){
        h.response(err).code(404)
    }
}

async function updateTask(req,h) {
    try{
       const updatedTask = await Task.findByIdAndUpdate(req.params.id , req.payload, {new: true})
       return h.response(updatedTask).code(200)
    }catch(err){
       h.response(err).code(404)
    }
}

async function deleteTask (req,h){
    try{
       const deletedTask = await Task.findByIdAndDelete(req.params.id)
       return h.response(deletedTask).code(200)
    }catch(err){
       return h.response(err).code(404)
    }
}
module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
}