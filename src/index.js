'use strict'
const Hapi = require('@hapi/hapi')
const Joi = require('@hapi/joi')
require('./database')
const Task = require('./models/tasks')
const init =  async () => {
    const server = new Hapi.Server({
        port:3000,
        host:'localhost'
    })

    server.route({
        method: 'POST',
        path: '/tasks',
        options: {
            validate:{
                payload: Joi.object({
                    name: Joi.string().min(5).required(),
                    description: Joi.string()
                }),
                failAction:(req,h,error) => {
                    return error.isJoi 
                    ? h.response(error.details[0]).takeover()
                    : h.response(error).takeover()
                }
            }
        },
        handler:async (req,h) => {
           try{
               const task = new Task(req.payload)
               const taskSaved = await task.save()
               return h.response(taskSaved).code(201)  
           }catch (err) {
               return h.response(err).code(500)
           }
        }
    })

    server.route ({
        method: 'GET',
        path:'/tasks',
        handler: async (req, h) => {
            try{
               const tasks = await Task.find()
               return h.response(tasks).code(200)
            }catch (err){
                return h.response(err).code(404)
            }
        }

    })

    server.route ({
        method: 'GET',
        path:'/tasks/{id}',
        handler: async (req, h) => {
            try{
              const Atask = await Task.findById(req.params.id)
              return h.response(Atask).code(200)
            }catch(err){
                return h.response(err).code(404)
            }
        }
    })

    server.route ( {
        method: 'PUT',
        path:'/tasks/{id}',
        options: {
            validate:{
                payload: Joi.object({
                    name: Joi.string().min(5).optional(),
                    description: Joi.string().optional()
                }),
                failAction:(req,h,error) => {
                    return error.isJoi 
                    ? h.response(error.details[0]).takeover()
                    : h.response(error).takeover()
                }
            }
        },
        handler: async (req,h) => {
           try{
              const updatedTask = await Task.findByIdAndUpdate(req.params.id , req.payload,{new:true})
              return h.response(updatedTask).code(200)
           }catch(err){
               return h.response(err).code(404)
           }
        }
    })

    server.route({
        method: 'DELETE',
        path: '/tasks/{id}',
        handler: async (req, h) => {
            try{
               const deletedTak  = await Task.findByIdAndDelete(req.params.id)
               return h.response(deletedTak).code(200)
            }catch(err){
               return h.response(err).code(404)
            }
        }
    })
    await server.start()
    console.log(`server running on ${server.info.uri}`)
}

init()