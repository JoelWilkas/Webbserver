import { createStore } from "vuex";

import io from 'socket.io-client'

export default createStore({
    state: {
        socket: io('10.32.37.160:3000'),
        room: "",
        wordCount: 15,
        playerNumber: 0
    },
    mutations: {
        changeRoom: (state, roomid) => {
            state.room = roomid
        },
        changeWordCount: (state, wordCount) => {
            state.wordCount = wordCount
        },
        changePlayer: (state, playerNumber) => {
            state.playerNumber = playerNumber
        }
    },
    actions: {
        
    },
    modules: {

    }
    
})