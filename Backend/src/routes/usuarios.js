const express = require('express')
const router = express.Router()

let usuarios = [{
    id: 1,
    nombre: "Max",
    dinero: 100,
    telefono: 1148403365,
    contraseña: 49957,
    usuario: "Mike12"
}, {
    id: 2,
    name: "Michael",
    money: 200,
    telefono: 1195730685,
    contraseña: 563474,
    usuario: "Michael34"
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

module.exports = router