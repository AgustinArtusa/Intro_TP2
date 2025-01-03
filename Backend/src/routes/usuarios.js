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


router.put('/:id', async (req, res) => {
    let usuario_index = usuarios.findIndex((element) => element.id == req.params.id)
    if (usuario_index === -1){
        res.sendStatus(404)
        return
    }

    usuarios[usuario_index].nombre = (req.body.nombre !== null && req.body.nombre !== undefined) ? req.body.nombre : usuarios[usuario_index].nombre
    usuarios[usuario_index].dinero = (req.body.dinero !== null && req.body.dinero !== undefined) ? req.body.dinero : usuarios[usuario_index].dinero

    usuarios[usuario_index].telefono = (req.body.telefono !== null && req.body.telefono !== undefined) ? req.body.telefono : usuarios[usuario_index].telefono
    usuarios[usuario_index].contraseña = (req.body.contraseña !== null && req.body.contraseña !== undefined) ? req.body.contraseña : usuarios[usuario_index].contraseña
    usuarios[usuario_index].username = (req.body.username !== null && req.body.username !== undefined) ? req.body.username : usuarios[usuario_index].username

    
    res.send(usuarios[usuario_index])


})
module.exports = router