const { PrismaClient } = require('@prisma/client')
const express = require('express');
const router = express.Router();

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const tiendas = await prisma.tienda.findMany()
    res.json(tiendas);
});

router.get('/:id', async (req, res) => {
    const tiendas = await prisma.tienda.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })

    if (tiendas === null){
        res.sendStatus(404)
        return
    }

    res.json(tiendas)
});

router.post('/', async (req, res) => {
    const tiendas = await prisma.tienda.create({
        data: {
            ubicacion: req.body.ubicacion,
            horario: req.body.horario,
            estado: req.body.estado,
            telefono: req.body.telefono,
            email_contacto: req.body.email_contacto
        }
    })
    res.status(201).send(tiendas)
});

router.delete('/:id', async (req, res) => {
    const tiendas = await prisma.tienda.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (tiendas === null) {
        res.sendStatus(404)
        return
    }

    await prisma.tienda.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })
    res.send(tiendas)
});

router.put('/:id', async (req, res) =>{
    let tiendas = await prisma.tienda.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (tiendas === null){
        res.sendStatus(404)
        return
    }
    tiendas = await prisma.tienda.update({
        where: {
            id: tiendas.id
        },
        data: {
            ubicacion: req.body.ubicacion,
            horario: req.body.horario,
            estado: req.body.estado,
            telefono: req.body.telefono,
            email_contacto: req.body.email_contacto
        }
    })
    res.send(tiendas)

});

module.exports = router;