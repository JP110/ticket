import { createRouter, createWebHistory } from 'vue-router'

import Myform from "/src/views/Myform.vue"
import Recap from "/src/views/Recap.vue"

const routes = [
   {
      path: '/',
      component: Myform,
   },
   {
      path: '/tickets',
      component: () => import("/src/views/Tickets.vue"),
   },
   {
      path: '/recap/:ticketId',
      component: Recap,
      props: (route) => ({ ticketId: parseInt(route.params.ticketId) })
   },
   {
      path: "/:catchAll(.*)",
      redirect: '/',
   },
]

const router = createRouter({
   history: createWebHistory('/'),
   routes
})

export default router
