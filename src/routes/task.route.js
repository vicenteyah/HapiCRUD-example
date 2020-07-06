'use strict'
const handlers = require('../handlers/tasks')
const taskSchema = require('../schemas/taskSchema')
const updateSchema = require('../schemas/taskUpdateSchema')
module.exports = [
    {
        method: 'POST',
        path:'/v1/tasks',
        handler: handlers.createTask,
        options: {
            validate:{
                payload: taskSchema.payload,
                failAction:(req,h,error) => {
                    return error.isJoi 
                    ? h.response(error.details[0]).takeover()
                    : h.response(error).takeover()
                }
            }
        }
    },
    {
      method: 'GET',
      path:'/v1/tasks',
      handler: handlers.getTasks
    },
    {
        method: 'GET',
        path:'/v1/tasks/{id}',
        handler: handlers.getTask
    },
    {
        method: 'PUT',
        path:'/v1/tasks/{id}',
        handler: handlers.updateTask,
        options:{
            validate: {
                payload: updateSchema.payload,
                failAction:(req,h,error) => {
                    return error.isJoi 
                    ? h.response(error.details[0]).takeover()
                    : h.response(error).takeover()
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/v1/tasks/{id}',
        handler: handlers.deleteTask
    }
]