const ConnectToMongo = require('./db')
const express = require('express')
var cors = require('cors') 

ConnectToMongo()
 
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello This is Rishi')
})

app.use(express.json())
app.use(cors())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})