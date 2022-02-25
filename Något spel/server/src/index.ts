import { Socket } from 'socket.io'
import { app, server } from './modules/express'
import { io } from './modules/socketio'
import { wordlist } from './modules/wordlist'

let users = []

const rooms: any = []
const admins: any = []
const roomWordList: any = new Map()



io.on('connection', (socket: Socket) => {
    

    socket.emit('connected')

    socket.on("join room", (roomid: string, cb) => {
        for(let x in rooms){
            if(rooms[x] == roomid){
                socket.join(roomid);
                console.log(socket.rooms)
                cb(roomid)
                
                io.to(roomid).emit('welcome', socket.id, false)
            }
        }
    })
    socket.on('gameStarted', (roomid, cb) => {
        socket.to(roomid).emit('otherGameStart')
    } )

    socket.on('CreateLobby', (roomid: string, cb) => {
        roomid.toString()
        rooms.push(roomid)
        socket.join(roomid)
        admins.push({userid: socket.id, room: roomid})
        cb(roomid)
        io.to(roomid).emit('welcome', socket.id, true)
        
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
    socket.on('gameInit', (roomid, cb) => {
        // let wordCount = roomWordCount.get(roomid)
        // let words = []
        // for(let x = 0; x < wordCount; x++){
        //     words.push( wordlist[Math.floor(Math.random()*wordlist.length)])
        // }
        // cb(words)
        cb(roomWordList.get(roomid))
    })
    socket.on('prepareGame', (roomid, wordCount,) => {
        let words = []
        for(let x = 0; x < wordCount; x++){
            words.push( wordlist[Math.floor(Math.random()*wordlist.length)])
        }
        roomWordList.set(roomid, words)

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