import { Socket } from 'socket.io'
import { app, server } from './modules/express'
import { io } from './modules/socketio'

let users = []

const rooms: any = []



io.on('connection', (socket: Socket) => {
    

    socket.emit('connected')

    socket.on("join room", (roomid: string, cb) => {
        for(let x in rooms){
            console.log(x)
            if(rooms[x] == roomid){
                socket.join(roomid);
                console.log(socket.rooms)
                cb(roomid)

                io.to(roomid).emit('welcome', socket.id)
            }
        }
    })

    socket.on('CreateLobby', (roomid: string, cb) => {
        roomid.toString()
        rooms.push(roomid)
        socket.join(roomid)
        console.log(socket.rooms)
        console.log("created a room")
        cb(roomid)
        io.to(roomid).emit('welcome', socket.id)
        
    })

    socket.on('roomLeave', roomid =>
    {
        socket.leave(roomid)
        if (!io.sockets.adapter.rooms.get(roomid)?.size){
            for (let i in rooms){
                if (rooms[i] == roomid){
                    rooms.splice(i, 1)
                }
            }
        }
    })


    // console.log(`The user ${socket.id} has connected`)
    // socket.on('disconnect', () => {
    //     console.log(`user ${socket.id} has left`)
    // })
})


server.listen(3000, () => {
    console.clear()
    console.log("server is listening on port 3000")
})