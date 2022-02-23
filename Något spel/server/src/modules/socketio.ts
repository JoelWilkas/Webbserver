import { Server } from 'socket.io'
import { app, server } from './express'

export const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})