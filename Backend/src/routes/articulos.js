const { PrismaClient } = require('@prisma/client')
const express = require('express');
const router = express.Router();

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const articulos = await prisma.articulo.findMany({
        orderBy: {
            id: 'asc',
        },
    })

    res.json(articulos);
});

router.get('/:id', async (req, res) => {
    const articulo = await prisma.articulo.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })

    if (articulo === null){
        res.sendStatus(404)
        return
    }

    res.json(articulo)
});

router.post('/', async (req, res) => {
    const articulo = await prisma.articulo.create({
        data: {
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            origen: req.body.origen,
            antiguedad: req.body.antiguedad,
            numero_vendedor: req.body.numero_vendedor,
            cantidad: req.body.cantidad
        }
    })
    res.status(201).send(articulo)
});

router.delete('/:id', async (req, res) => {
    const articulo = await prisma.articulo.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (articulo === null) {
        res.sendStatus(404)
        return
    }

    await prisma.compra.deleteMany({
        where: {
            articuloId: articulo.id,
        }
    });

    await prisma.disponibilidad.deleteMany({
        where: {
            articuloId: articulo.id,
        }
    });

    await prisma.articulo.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })
    res.send(articulo)
});

router.put('/:id', async (req, res) =>{
    let articulo = await prisma.articulo.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (articulo === null){
        res.sendStatus(404)
        return
    }
    articulo = await prisma.articulo.update({
        where: {
            id: articulo.id
        },
        data: {
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            origen: req.body.origen,
            antiguedad: req.body.antiguedad,
            numero_vendedor: req.body.numero_vendedor,
            EnVenta: req.body.EnVenta,
            cantidad: req.body.cantidad
        }
    })
    res.send(articulo)

});

module.exports = router;