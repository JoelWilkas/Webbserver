import { createStore } from "vuex";

import io from 'socket.io-client'

export default createStore({
    state: {
        socket: io('http://localhost:3000'),
        room: ""
    },
    mutations: {
        changeRoom: (state, roomid) => {
            state.room = roomid
        }
    },
    actions: {
        
    },
    modules: {

    }
    
})