if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const httpServer = require('http').createServer(app)
const io = require("socket.io")(httpServer)
const routes = require('./routes')
const cors = require('cors')

let loggedInChatUsers = []
const messageHistory = []

io.on('connection', socket => { 
    socket.on('sendMessage', message => {
        messageHistory.push(message)
        io.emit('syncMessage', messageHistory)
    })

    socket.on('loginChat', user => {
        loggedInChatUsers.push(user)
        io.emit('syncLoggedInChatUser', loggedInChatUsers)
    })

    socket.on('logoutChat', user => {
        loggedInChatUsers = loggedInChatUsers.filter(el => el !== user)
        io.emit('syncLoggedInChatUser', loggedInChatUsers)
    })
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routes)

httpServer.listen(port, () => console.log(`Server running on port http://localhost:${port}`))


