const cors = require("cors")
const helmet = require("helmet")
const express = require("express")
const usersRouter = require("./usersRouter")
module.exports = server => {
    server.use(cors()),
    server.use(helmet()),
    server.use(express.json())
    server.use('/api/', usersRouter);
}