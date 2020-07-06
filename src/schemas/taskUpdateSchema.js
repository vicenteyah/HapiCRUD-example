'use strict'
const Joi = require('@hapi/joi')

module.exports = {
    payload: Joi.object({
        name: Joi.string().min(5).optional(),
        description: Joi.string().optional()
    })
}