import express from 'express'
import { Category, PrismaClient } from '@prisma/client'
const PORT = 3001

const app = express()

const prisma = new PrismaClient()

app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"))

app.get('/api/ticket', async (req, res) => {
    const allTickets = await prisma.ticket.findMany(
    )
    res.send(allTickets)
 });

 app.post("/api/ticket", async function(req, res) {
    const body = req.body
   const ticket=  await prisma.ticket.create({
        data: { 
            email: body.email,
            category: body.category,
            description: body.description,
            priority: body.priority,
        },
      })
      res.send(ticket)
})

app.get('/api/ticket/:id', async (req, res) => {
    const allTickets = await prisma.ticket.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      })
    res.send(allTickets)
 });



app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))