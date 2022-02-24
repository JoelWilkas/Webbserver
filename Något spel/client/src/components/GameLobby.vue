<template>
    <div class="gameLobby">
        <div class="roomCode">
            <h1>Room Code:</h1>
            <p class="code" v-if="showInput" @click="copy"   :aria-label="tooltipText"
            data-microtip-position="top"
            role="tooltip">{{room}}</p>
            <p class="code" v-else @click="copy" :aria-label="tooltipText"
            data-microtip-position="top"
            role="tooltip"><img src="https://s2.svgbox.net/octicons.svg?ic=dot-fill&color=8235f5" width="32" height="32"><img src="https://s2.svgbox.net/octicons.svg?ic=dot-fill&color=8235f5" width="32" height="32"><img src="https://s2.svgbox.net/octicons.svg?ic=dot-fill&color=8235f5" width="32" height="32"><img src="https://s2.svgbox.net/octicons.svg?ic=dot-fill&color=8235f5" width="32" height="32"><img src="https://s2.svgbox.net/octicons.svg?ic=dot-fill&color=8235f5" width="32" height="32"></p>
            <button @click="showPassword" type="button"
            ><img src="https://s2.svgbox.net/hero-outline.svg?ic=eye&color=8235f5" width="32" height="32">
            </button>

            


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
             showInput: false,
             tooltipText: "Click to copy"
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
            this.tooltipText = "Copied!"
            setTimeout(() => this.tooltipText = "Click to copy", 2000)
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
        justify-content: space-between;
        height: 4em;
        width: 500px;
        margin-bottom: 2em;
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
    .code{
        font-size: 3em;
        &:hover{
            cursor: pointer;
        }
    }
    
</style>