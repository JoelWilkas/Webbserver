import { createStore } from "vuex";

import io from 'socket.io-client'

export default createStore({
    state: {
        socket: io('http://10.32.37.160:3000'),
        room: "",
        wordCount: 15
    },
    mutations: {
        changeRoom: (state, roomid) => {
            state.room = roomid
        },
        changeWordCount: (state, wordCount) => {
            state.wordCount = wordCount
        }
    },
    actions: {
        
    },
    modules: {

    }
    
})