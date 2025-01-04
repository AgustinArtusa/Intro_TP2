const { PrismaClient } = require('@prisma/client')
const express = require('express');
const router = express.Router();

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const articulos = await prisma.articulo.findMany()
    res.json(articulos);
});

router.get('/:id', async (req, res) => {
    const articulo = articulos.find((element) => element.id == req.params.id);
    if (articulo === undefined) {
        res.sendStatus(404);
        return;
    }
    res.json(articulo);
});

router.post('/', async (req, res) => {
    const articulo = await prisma.articulo.create({
        data: {
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            origen: req.body.origen,
            antiguedad: req.body.antiguedad
        }
    })
    res.status(201).send(articulo)
});

router.delete('/:id', async (req, res) => {
    const articulo = articulos.find((element) => element.id == req.params.id);

    if (!articulo) {
        res.sendStatus(404);
        return;
    }

    articulos = articulos.filter((element) => element.id != req.params.id);

    res.send(articulo);
});

router.put('/:id', async (req, res) =>{
    let articulo_index = articulos.findIndex((element) => element.id == req.params.id);
    
    if (articulo_index === -1) {
        res.sendStatus(404);
        return;
    }

    articulos[articulo_index].nombre = req.body.nombre ?? articulos[articulo_index].nombre
    articulos[articulo_index].precio = req.body.precio ?? articulos[articulo_index].precio
    articulos[articulo_index].descripcion = req.body.descripcion ?? articulos[articulo_index].descripcion
    articulos[articulo_index].origen = req.body.origen ?? articulos[articulo_index].origen
    articulos[articulo_index].antiguedad = req.body.antiguedad ?? articulos[articulo_index].antiguedad

    res.send(articulos[articulo_index])

});

module.exports = router;