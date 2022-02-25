<template>
    <h1 class="countdown" v-if="countdownVisable">{{coutdownTime}}</h1>
    <div class="words">
        <p ref="wordDisplay">
            <span v-for="word in wordArray" :key="word">
            {{word}}
            </span>
        </p>
    </div>
    <textarea :readonly="isReadonly" type="text" ref="input" @input="inputChange"></textarea>
    <h1 v-if="isGameOver">Your words per minuit was: {{wordsPerMin}}</h1>
</template>
<script>
export default {
    
    name: "Game",
    data(){
        return{
            wordArray: [],
            isReadonly: true,
            coutdownTime: 5,
            countdownVisable: true,
            isGameOver: false,
            gameTime: 0,
            wordsPerMin: 0
        }
    },
    created(){

        if(!this.$store.state.room) this.$router.push('/')
        this.$store.state.socket.emit('gameInit', this.$store.state.room, (wordList) => this.gameInit(wordList))

    },
    mounted(){
        
        let counddownInterval = setInterval(() => {
            if(this.coutdownTime != 0){
                this.coutdownTime -= 1
                
            } else {
                this.isReadonly = false
                this.countdownVisable = false
                clearInterval(counddownInterval)
            }
            console.log("Obama")
        }, 1000)

        let gameTimer = setInterval(() => {
            if(!this.isGameOver){
                this.gameTime += 0.01
            } else {
                // console.log(twhis.gameTime)
                clearInterval(gameTimer)
            }
        }, 1)
        
    },
    methods: {
        gameInit(wordList){
            wordList.forEach((word) => {
                word += " "
                word.split("").forEach((character) => {
                    this.wordArray.push(character)
                } )
            })
            this.wordArray.pop()
        },
        inputChange(){
            let wordArray = [...this.$refs.wordDisplay.children]
            let inputArray = this.$refs.input.value.split("")
            let correct = true
            wordArray.forEach((characterSpan, index) => {
                const character = inputArray[index]
                if(character == null){
                    characterSpan.classList.remove('correct')
                    characterSpan.classList.remove('incorrect')
                    correct = false
                }
                else if(character === characterSpan.textContent){
                    characterSpan.classList.add('correct')
                    characterSpan.classList.remove('incorrect')
                } else {
                    characterSpan.classList.remove('correct')
                    characterSpan.classList.add('incorrect')
                    correct = false
                }   
            })
            if(correct){
                console.log(this.gameTime)
                this.wordsPerMin = Math.round(15 / this.gameTime * 60)
                this.isGameOver = true
                this.isReadonly = true
                console.log("Everything is correct!")
            }
        }
    },

}
</script>
<style lang="scss" scoped>
    *{
        color: #8235f5;
    }
    .words{
        padding: 2em;
        display: block;
        width: 500px;
        // user-select: none;
        font-size: 1.5em;
    }
    .correct{
        color: green;
    }
    .incorrect{
        color: red;
        text-decoration: underline;
    }
    textarea{
        width: 500px;
        height: 7;
        background: none;
        border: #8235f5 5px solid;
        border-radius: 10px;
        font-size: 1.5em;
        padding: 1em;
    }
    .countdown{
        position: absolute;
        top: 50%;
        left: 50%;
        right: 50%;
    }
</style>