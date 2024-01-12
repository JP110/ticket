<template>
    <div class="flex">
      <div>
          <template v-for="ticket in allTickets" >
            <TicketCard @click="handleClick(ticket.id)" :ticketId=ticket.id :selected="ticket.id == selectedTicketId"></TicketCard>
          </template>
         </div>
         <router-view></router-view>
    </div>

 </template>
 
 <script setup>
 import { ref, } from 'vue'
import TicketCard from '../components/TicketCard.vue';
import router from '../router';
import { useRoute } from 'vue-router'
import { allTickets } from '../use/useTickets.mjs'
 const route = useRoute()
const selectedTicketId = ref(route.params.ticketId)

 const handleClick = (id) => {
   selectedTicketId.value = id
  router.push(`/tickets/${id}`)
}
 </script>