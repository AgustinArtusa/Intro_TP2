const express = require('express')
const router = express.Router()

let usuarios = [{
    id: 1,
    nombre: "Max",
    dinero: 100,
    telefono: 1148403365,
    contraseña: 49957,
    username: "Mike12"
}, {
    id: 2,
    nombre: "Michael",
    dinero: 200,
    telefono: 1195730685,
    contraseña: 563474,
    username: "Michael34"
}]

router.get('/', async (req, res) => {
    res.json(usuarios)

})

router.get('/:id', async (req, res) =>{
    const usuario = usuarios.find((element) => element.id == req.params.id)

    if (usuario === undefined){
        res.sendStatus(404)
        return
    }

    res.json(usuario)
})

router.post('/', (req, res) => {
    const usuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        dinero: (req.body.money !== null && req.body.money !== undefined) ? req.body.money : 0,
        telefono: req.body.telefono,
        contraseña: req.body.contraseña,
        username: req.body.username
    }

    usuarios.push(usuario)
    res.status(201).send(usuario)
})

router.delete('/:id', async (req, res) => {
    const usuario = usuarios.find((element) => element.id == req.params.id)
    if (usuario === undefined) {
        res.sendStatus(404)
        return
    }

    usuarios = usuarios.filter((element) => element.id != req.params.id)
    res.send(usuario)
})

module.exports = router