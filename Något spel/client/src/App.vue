<template>
  <div class="container">
    <div v-if="connected">
    <div v-if="!room">
      
      <CreateRooms />
      <RoomConnection />
    </div>
    <GameLobby :room="room" v-else/>
  </div>
  <h1 v-else>Could not establish a connection the the servers</h1>
  </div>
</template>

<script>
  
  import RoomConnection from './components/RoomsConnection.vue'
  import CreateRooms from './components/CreateRooms.vue'
  import GameLobby from './components/GameLobby.vue'
  

export default {

  name: 'App',
  components: {
    RoomConnection,
    CreateRooms,
    GameLobby
  },
  data() {
    return {
      connected: false,
      inLobby: false
    }
  },
  mounted(){
    this.$store.state.socket.on('connected', () => {
      this.connected = this.$store.state.socket.connected
    })
  },
  computed: {
    room(){
      return this.$store.state.room
    }
  }
}
</script>

<style lang="scss">
body{
  box-sizing: border-box;
  background: #121212;
  color: #8235f5;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  height: 80vh;
}

.container{
  margin-top: 100px;
}


</style>
