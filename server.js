const express = require("express")
const server = express()
const configureMiddleware = require("./configueMiddleware")
configureMiddleware(server)



module.exports = server;