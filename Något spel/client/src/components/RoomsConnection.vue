<template>
    <form @submit="searchRoom">
        <input type="text" placeholder="Game ID" v-model="gameid">
        <button type="submit">></button>
    </form>
</template>

<script>
export default {
    name: 'RoomsConnection',
    data(){
        return {
            gameid: "",
        }
    },
    methods: {
        searchRoom(e){
            e.preventDefault();
            this.$store.state.socket.emit('join room', this.gameid, (roomid) => this.changeRoom(roomid))
        },

        changeRoom(roomid){
            console.log("Changed room to :" + roomid)
            this.$store.commit('changeRoom', roomid)
            console.log(this.$store.state.room)
        }
    }
}
</script>







<style lang="scss" scoped>
    form{
        display: flex;
        flex-direction: row;
        
        input{
            color: #8235f5;
            font-weight: bold;
            font-size: 1.5em;
            width: 10em;
            background: rgba(0, 0, 255, 0);
            border: 5px solid #8235f5;
            border-radius: 10px;
            padding: 0.5em 1em;
        }
        input:focus{
                outline: none;
        }

        button{
            color: #8235f5;
            font-weight: bold;
            height: 63px;
            width: 63px;
            background: rgba(0, 0, 255, 0);
            border: 5px solid #8235f5;
            border-radius: 10px;
            margin-left: 1em;
        }
        button:hover{
            color: #121212;
            background: #8235f5;
        }
    }
</style>