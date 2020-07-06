'use strict'
const routes = require('./routes/index')
const Hapi = require('@hapi/hapi')

const init =  async () => {
    const server = new Hapi.Server({
        port:3000,
        host:'localhost'
    })

    server.route(routes)

    await server.start()
    console.log(`server running on ${server.info.uri}`)
}

init()