
import { computed, ref } from 'vue'
import { useSessionStorage } from '@vueuse/core'
import VueCookies from 'vue-cookies'
import router from '../router';
const id2ticket = useSessionStorage('id2ticket', {})
export const ticketsloaded = useSessionStorage('ticket-list-complete', false)


export const allTickets = 
computed ( () => {
     if (ticketsloaded.value)
     {
       return Object.values(id2ticket.value)
     }
         id2ticket.value ={}
         fetch('/api/ticket', {
            method: 'GET',
            headers: {
               "Content-Type": "application/json",
            },
         })
         .then(response => response.json())
         .then(ticketList => 
            {
                for(let ticket of ticketList)
         {
             id2ticket.value[ticket.id] = ticket
         }
          ticketsloaded.value = true
        })
        return []
  })
export async function getAllTickets()
{
    const response = await fetch('/api/ticket', {
    method: 'GET',
    headers: {
       "Content-Type": "application/json",
    },
 })
 const ticketList  = ref([])
 ticketList.value = await response.json()
 for(let ticket of ticketList.value)
    {
        id2ticket.value[ticket.id] = ticket
    }
    return ticketList.value;
}

export async function asyncTickets(ticketId)
{
    const ticket = ref({})
    if (ticketId in id2ticket.value)
        {
            return id2ticket.value[ticketId]
        }
    else
    {
        const response = await fetch(`/api/ticket/${ticketId}`)
        ticket.value = await response.json()
        id2ticket.value[ticketId] = ticket.value
        return ticket.value
    }    
}



// export const visibleTickets = computed(() => (categories, priorities) => {
//    allTickets.filter(ticket => categories.has(ticket.category))
//    .filter(ticket => priorities.has(ticket.priority))
//  })
export const ticketOfId = computed(() => (id) => {
    const ticket = id2ticket.value[id]
    if (ticket) return ticket
    fetch(`/api/ticket/${id}`).then(response => response.json()).then(ticket => {
       id2ticket.value[ticket.id] = ticket
    })
 })


export const visibleTickets = computed(() => (filteredPriorities, filteredCategories) => {
    const listTicketsfiltered = allTickets.value
    .filter(ticket => filteredPriorities.has(ticket.priority))
    .filter(ticket => filteredCategories.has(ticket.category))
    return listTicketsfiltered
 })
 
 export const logout = () => {
    router.push(`/signin`)
    sessionStorage.clear()
    
    VueCookies.remove("access_token") 
    // = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
 }