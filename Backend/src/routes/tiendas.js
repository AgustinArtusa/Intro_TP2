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

router.post('/:id/articulos', async (req, res) => {
    // Buscar la tienda por su ID
    const tienda = await prisma.tienda.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    });

    if (tienda === null) {
        res.status(404).send("Tienda no encontrada");
        return;
    }

    // Buscar el artículo por su ID
    const articulo = await prisma.articulo.findUnique({
        where: {
            id: parseInt(req.body.articuloId)  // Usar articuloId en lugar de articulo_id
        }
    });

    if (articulo === null) {
        res.status(404).send("Artículo no encontrado");
        return;
    }

    // Verificar si el artículo ya está registrado en cualquier tienda
    const disponibilidadExistente = await prisma.disponibilidad.findFirst({
        where: {
            articuloId: articulo.id
        },
    });

    if (disponibilidadExistente) {
        return res.status(400).send("El artículo ya está registrado en una tienda");
    }

    // Crear la relación de disponibilidad entre la tienda y el artículo
    await prisma.disponibilidad.create({
        data: {
            articuloId: articulo.id,
            tiendaId: tienda.id
            
        }
    });

    res.sendStatus(201)
});



router.get('/:id/articulos', async (req, res) => {
    const tienda = await prisma.tienda.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            articulosDisponibles: true
        }
    });

    if (tienda === null) {
        res.status(404).send("Tienda no encontrada");
        return;
    }

    const articulos = await prisma.articulo.findMany({
        where: {
            id: { in: tienda.articulosDisponibles.map(disponibilidad => disponibilidad.articuloId) }
        }
    });    
    //filter(disponibilidad => disponibilidad.disponible)
    // Extraer solo la información de los artículos
    //const articulos = tienda.articulosDisponibles.map(disponibilidad => disponibilidad.articulo);

    res.json(articulos);
});



module.exports = router;