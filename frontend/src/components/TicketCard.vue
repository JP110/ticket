
<script setup>
import { ref, onMounted, computed } from 'vue'
import { CATEGORIES, PRIORITIES } from '../constants'
import { getAllTickets, asyncTickets} from '../use/useTickets.mjs'
const props = defineProps({
   ticketId: {
      type: Number,
      required: true,
   },
   selected: {
      type: Boolean,
      default: false,
   },
})

 const ticket = ref({})
 
 onMounted(async () => {
    //const response = await fetch(`/api/ticket/${props.ticketId}`)
    ticket.value = await asyncTickets(props.ticketId)
 })

</script>
<template>
     <div class="w-80 rounded shadow-lg " :class="{'bg-gray-200': selected}">
       <!-- <div class="grid grid-cols-2 gap-3"> -->
             <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <div class="px-6 py-4">
                   <div class="font-bold text-xl mb-2">Ticket #{{ ticket.id }}</div>
                   <p class="text-gray-700 text-sm">
                     {{ ticket.description?.length > 3 ? ticket.description.substring(0, 3) + '...': ticket.description }}
                  </p>
                </div>
                 <div class="px-6 pt-2 pb-2">
                   <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{ CATEGORIES[ticket.category] }}</span>
                   <span class="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                      :class="{'bg-red-200': ticket.priority === 'high', 'bg-orange-200': ticket.priority === 'normal', 'bg-yellow-200': ticket.priority === 'low',  }">
                      {{ PRIORITIES[ticket.priority] }}
                   </span> 
                </div> 
             </div>
       <!-- </div> -->
    </div>
 </template>
 
