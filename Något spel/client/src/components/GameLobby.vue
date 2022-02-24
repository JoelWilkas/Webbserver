<template>
    <div class="gameLobby">
        <div class="roomCode">
            <h1>Room Code:</h1>
            <input v-on:focus="$event.target.select()" 
            hidden
            :type="showInput ? 'text': 'password'"
            @click="copy"
            :value="room"/>
           
            <button @click="showPassword"
                        type="button"
                        v-clipboard:copy="room"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            ><img src="https://s2.svgbox.net/hero-outline.svg?ic=eye&color=8235f5" width="32" height="32"></button>
        </div>
         

        <button @click="back" >Back </button>
    </div>
</template>

<script>
import CopyToClipboard from 'vue-copy-to-clipboard'
export default {
    name: "GameLobby",
    props: {
        room: String,
       
    },
    components: {
        CopyToClipboard
    },
    data(){
        return{
             showInput: false
        }
    },
    mounted(){
        this.$store.state.socket.on('welcome', (socket) => {
            console.log(`${socket} has joined the lobby`)
        })
    },
    methods:{
        back(){
            this.$store.state.socket.emit('roomLeave', this.$store.state.room)
            this.$store.commit("changeRoom", "")
        },
        showPassword(e){
            e.preventDefault()
            this.showInput = !this.showInput
        },
        copy(){
            console.log("copied")
            navigator.clipboard.writeText(this.room)
            // this.$refs.myinput.focus();
            // document.execCommand('copy')
        },
    }
}
</script>

<style lang="scss" scoped>
    form{
        display: flex;
        flex-direction: row;
        width: 200px;
        margin-bottom: 1em;
        
    }
    button{
        background: none;
        border: 5px solid #8235f5;
        border-radius: 10px;
        color: #8235f5;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: 2em;
        width: 100px;
    }
    .roomCode{
        display: flex;
        align-items: center;
        h1{
            margin-right: 2em;
        }
        button{
            width: 50px;
            height: 50px;
        }
    }
    input{
        display: block;
        background: none;
        color: blueviolet;
        border: none;
        font-size: 2em;
        font-weight: bold;
        width: 4em;
    }
    .gameLobby{
        width: 80vw;
        height: 60vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>