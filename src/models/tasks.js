'use strict'
const { Schema, model } = require('mongoose')

const taskSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description: String
},{
    timestamps:true
})

module.exports  = model ('Task',taskSchema)