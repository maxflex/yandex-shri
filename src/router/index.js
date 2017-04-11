import Vue from 'vue'
import Router from 'vue-router'
import Schedule from '@/components/Schedule'
import Lecture from '@/components/Lecture'
import Speaker from '@/components/Speaker'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'schedule',
      component: Schedule
    },
    {
      path: '/lectures/:id',
      name: 'lectures',
      component: Lecture
    },
    {
      path: '/speakers/:id',
      name: 'speakers',
      component: Speaker
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
