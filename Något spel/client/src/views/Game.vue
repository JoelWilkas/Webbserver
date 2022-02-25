<template>
    <p>{{wordString}}</p>
</template>
<script>
export default {
    name: "Game",
    data(){
        return{
            wordString: ""
        }
    },
    created(){

        if(!this.$store.state.room) this.$router.push('/')
        this.$store.state.socket.emit('gameInit', this.$store.state.room, (wordList) => this.gameInit(wordList))

    },
    methods: {
        gameInit(wordList){
            console.log(wordList)
            this.wordString = wordList + " "
        }
    }
}
</script>
<style lang="scss" scoped>
    *{
        color: #8235f5;
    }
</style>