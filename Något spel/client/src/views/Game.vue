<template>
    aaa
</template>
<script>
export default {
    name: "Game",
    created(){
        console.log(this.$store.state.wordCount)
        if(!this.$store.state.room) this.$router.push('/')
        this.$store.state.socket.emit('gameInit', this.$store.state.room, this.$store.state.wordCount, (wordList) => this.gameInit(wordList))
    },
    methods: {
        gameInit(wordList){
            console.log(wordList)
        }
    }
}
</script>
