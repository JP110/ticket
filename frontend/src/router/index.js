import { createRouter, createWebHistory } from 'vue-router'

import Myform from "/src/views/Myform.vue"
import Recap from "/src/views/Recap.vue"
import TicketDetail from "/src/components/TicketDetail.vue"
const routes = [
   {
      path: '/',
      component: Myform,
   },
   {
      path: '/tickets',
      component: () => import("/src/views/Tickets.vue"),
      children: [
         {
            path: '/tickets/:ticketId',
            name: 'ticketDetail',
            component: TicketDetail,
            // component: () => import('/src/components/TicketDetail.vue'),
            props: true,
         },
      ],
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
