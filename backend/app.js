import express from 'express'
import { Category, PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import bearerToken from 'express-bearer-token'
import cookieParser from 'cookie-parser'
const saltRounds = 3

const PORT = 3001

const app = express()

const prisma = new PrismaClient()
const hashadmin = await bcrypt.hash("12345", saltRounds)
const hashJC = await bcrypt.hash("hjaf67yret32", saltRounds)
const hashJP = await bcrypt.hash("1234", saltRounds)
const authUSer = [
    { email: 'admin@mail.fr', admin: true, password: hashadmin },
    { email: 'jc@mail.fr', admin: false, password: hashJC },
    { email: 'sd@gmail.com', admin: false, password: hashJP },
]
const secretKey = 'MaCleSecreteTresLongueEtComplexe!@#123';
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs')
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use(express.static("public"))
app.use(cookieParser())
app.use(bearerToken({ cookie:{signed : false} }))
app.get('/api/ticket', async (req, res) => {
  const token = req.cookies;
  // Verify the token (this is just an example, adjust as needed)
  try {
    const payload = jwt.verify(token.access_token, secretKey)
    console.log(payload.readlist)
    if (payload.readlist === "all")
   
  {
    console.log(" admin")
    const allTickets = await prisma.ticket.findMany(
    )
   
    res.send(allTickets)
  }
  else
  {
    console.log("pas admin")
    const allTickets = await prisma.ticket.findMany({
      where: {
        email: payload.readlist,
      }
    }
      )
      res.send(allTickets)
  }
  } catch(err) {
    console.log("signature invalide")
  }
  
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


 app.post("/api/auth", async function(req, res) {
  const body = req.body
  const email = body.email
  const password = body.password
  const currUser = authUSer.find(usr => usr.email === email)
  const validPwd = await bcrypt.compare(password, currUser.password) 
  if (currUser && validPwd)
  {
    let token 
    //tout est ok 

    if (currUser.admin)
    {
       token = jwt.sign({ readlist:'all', readticket:'all', writeticket:'all' }, secretKey)
    }
    else
    {
       token = jwt.sign({ readlist:currUser.email, readticket:currUser.email, writeticket:'none' }, secretKey)
    }
    
    res.status(200).cookie('access_token', token).send();
  }
  else
  {
    res.sendStatus(403)
  }
})

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))