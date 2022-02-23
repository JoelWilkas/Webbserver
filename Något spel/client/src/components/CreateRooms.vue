<template>
    <form @submit="createRoomClick">
        <button type="submit" >Create Room</button>
    </form>
</template>
<script>
export default {
    name: "CreateRooms",
    methods: {
        createRoomClick(e){
            e.preventDefault();
            let lobbyCode = Math.floor(Math.random()*(9999-1000+1)+1000);

            this.$store.state.socket.emit('CreateLobby', lobbyCode.toString(), (roomid) => {
                this.$store.commit('changeRoom', roomid)
            })
        }
    }
}
</script>

<style lang="scss">
    button{
        color: #8235f5;
        font-weight: bold;
        font-size: 1.5em;
        width: 275px;
        background: rgba(0, 0, 255, 0);
        border: 5px solid #8235f5;
        border-radius: 10px;
        padding: 0.5em;
    }

    button:hover{
        color: #121212;
        background: #8235f5;
    }
</style>