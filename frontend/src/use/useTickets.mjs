
import { computed, ref } from 'vue'
import { useSessionStorage } from '@vueuse/core'
const id2ticket = useSessionStorage('id2ticket', {})
const ticketsloaded = useSessionStorage('ticket-list-complete', false)


export const allTickets = 
computed ( () => {
     if (ticketsloaded.value)
     {
       return Object.values(id2ticket.value)
     }

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
