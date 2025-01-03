const express = require('express')
//var cors = require('cors')
//const usuarios = require('./routes/usuarios')
//const productos = require('')
const app = express()
const port = 3000

app.use(express.json())
//app.use(cors())

app.get('/', (req, res) => {
  res.send('Pagina inicio')
})

//app.use('/api/v1/usuarios', usuarios)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  