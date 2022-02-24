import { createRouter, createWebHistory } from 'vue-router'
import App from '../views/Lobby.vue'
import Game from '../views/Game.vue'

const routes = [
  {
    path: '/',
    name: 'App',
    component: App
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
