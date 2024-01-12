<template>
    <div class="flex">
      <div>
          <template v-for="ticket in ticketList" >
            <TicketCard @click="handleClick(ticket.id)" :ticketId=ticket.id :selected="ticket.id == selectedTicketId"></TicketCard>
          </template>
         </div>
         <router-view></router-view>
    </div>

 </template>
 
 <script setup>
 import { ref, onMounted, computed } from 'vue'
import TicketCard from '../components/TicketCard.vue';
import router from '../router';
import { useRoute } from 'vue-router'
 const ticketList = ref([])
 const route = useRoute()
const selectedTicketId = ref(route.params.ticketId)
 onMounted(async () => {
    const response = await fetch('/api/ticket', {
       method: 'GET',
       headers: {
          "Content-Type": "application/json",
       },
    })
    ticketList.value = await response.json()
 })
 const handleClick = (id) => {
   selectedTicketId.value = id
  router.push(`/tickets/${id}`)
}
 </script>