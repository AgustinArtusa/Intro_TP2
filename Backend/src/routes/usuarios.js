const { PrismaClient } = require('@prisma/client')
const express = require('express')
const router = express.Router()

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const usuarios = await prisma.usuario.findMany()
    res.json(usuarios)
})

router.get('/:id', async (req, res) =>{
    const usuario = await prisma.usuario.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })

    if (usuario === null){
        res.sendStatus(404)
        return
    }

    res.json(usuario)
})

router.post('/', async (req, res) => {
    const usuario = await prisma.usuario.create({
        data: {
            nombre: req.body.nombre,
            username: req.body.username,
            contraseña: req.body.contraseña,
            dinero: req.body.dinero,
            telefono: req.body.telefono
        }
    })

    res.status(201).send(usuario)
})

router.delete('/:id', async (req, res) => {
    const usuario = await prisma.usuario.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (usuario === null) {
        res.sendStatus(404)
        return
    }

    await prisma.usuario.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })
    res.send(usuario)
})


router.put('/:id', async (req, res) => {
    let usuario = await prisma.usuario.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (usuario === null){
        res.sendStatus(404)
        return
    }
    usuario = await prisma.usuario.update({
        where: {
            id: usuario.id
        },
        data: {
            nombre: req.body.nombre,
            username: req.body.username,
            contraseña: req.body.contraseña,
            dinero: req.body.dinero,
            telefono: req.body.telefono
        }
    })
    res.send(usuario)
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const usuario = await prisma.usuario.findFirst({
        where: {
            username: username,
        }
    });

    if (!usuario || usuario.contraseña !== password) {
        res.status(401).json({ message: 'Credenciales incorrectas' });
    } else {
        res.status(200).json({ message: 'Login exitoso' });
    }
});

module.exports = router