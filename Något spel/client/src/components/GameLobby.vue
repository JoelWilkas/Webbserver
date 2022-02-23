<template>
    <h1>{{ room }}</h1>
</template>

<script>
export default {
    name: "GameLobby",
    props: {
        room: String
    },
    mounted(){
        this.$store.state.socket.on('welcome', (socket) => {
            console.log(`${socket} has joined the lobby`)
        })
    }
}
</script>

<style lang="scss">

</style>