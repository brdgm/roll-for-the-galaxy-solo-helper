import { RouteRecordRaw } from 'vue-router'
import createRouterMatomoTracking from '@brdgm/brdgm-commons/src/util/router/createRouterMatomoTracking'
import { name, version, appDeployName } from '@/../package.json'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import SetupGame from '@/views/SetupGame.vue'
import RoundPhaseSelection from '@/views/RoundPhaseSelection.vue'
import RoundPhaseExecution from '@/views/RoundPhaseExecution.vue'
import EndGameScoring from '@/views/EndGameScoring.vue'

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
    path: '/scoring',
    name: 'EndGameScoring',
    component: EndGameScoring
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouterMatomoTracking(routes, LOCALSTORAGE_KEY, appDeployName, version, 'AppHome')