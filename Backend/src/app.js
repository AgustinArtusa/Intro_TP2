const express = require('express')
var cors = require('cors')
const usuarios = require('./routes/usuarios')
const articulos = require('./routes/articulos')
const tiendas = require('./routes/tiendas')
const session = require('express-session')
const app = express()
const port = 3000

app.use(express.json())
app.use(cors({
  origin: 'https://articulos-coleccionables.onrender.com',
  credentials: true
}));

app.set('trust proxy', 1);
app.use(session({
  secret: 'Contraseña123',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 1800000
   }
}));

app.get('/', (req, res) => {
  res.send('Pagina inicio')
})

app.use('/api/v1/usuarios', usuarios)
app.use('/api/v1/articulos', articulos)
app.use('/api/v1/tiendas', tiendas)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  