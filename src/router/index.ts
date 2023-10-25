import { RouteRecordRaw } from 'vue-router'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import SetupGame from '@/views/SetupGame.vue'
import createRouter from 'brdgm-commons/src/util/router/createRouter'
import { name } from '@/../package.json'
import RoundPhaseSelection from '@/views/RoundPhaseSelection.vue'
import RoundPhaseExecution from '@/views/RoundPhaseExecution.vue'

const LOCALSTORAGE_KEY = `${name}.route`

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AppHome',
    component: AppHome
  },
  {
    path: '/setupGame',
    name: 'SetupGame',
    component: SetupGame
  },
  {
    path: '/round/:round/selectPhase',
    name: 'RoundPhaseSelection',
    component: RoundPhaseSelection
  },
  {
    path: '/round/:round/phase/:phase',
    name: 'RoundPhaseExecution',
    component: RoundPhaseExecution
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouter(routes, LOCALSTORAGE_KEY, 'AppHome')