const { PrismaClient } = require('@prisma/client')
const express = require('express');
const router = express.Router();

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const compras = await prisma.compra.findMany({
        include: {
            usuario: true,
            articulo: true,
        },
    }).catch(error => {
        res.status(500).json({error: `Error al obtener las compras: ${error.message}`});
    });
    
    if (!compras){
        return res.status(404).json({message: 'No se encontraron compras'})
    }
    res.json(compras)
})

router.post('/', async (req,res) => {
    const { usuarioId, articuloId } = req.body;
    
    if (!usuarioId || !articuloId) {
        return res.status(400).json({message: 'Se requieren usuarioId y articuloId.'});
    }

    const disponibilidad = await prisma.disponibilidad.findFirst({
        where: {
            articuloId: articuloId,
            disponible: true,
        },
    });

    if (!disponibilidad) {
        return res.status(404).json({message: 'El articulo no está disponible'})
    }

    const usuario = await prisma.usuario.findUnique({
        where: { id: usuarioId },
    });
    const articulo = await prisma.articulo.findUnique({
        where: { id: articuloId },
    });

    if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    if (!articulo) {
        return res.status(404).json({ message: 'Artículo no encontrado.' });
    }
    if (usuario.dinero < articulo.precio) {
        return res.status(400).json({ message: 'No hay suficiente dinero para comprar este artículo.' });
    }

    const compra = await prisma.compra.create({
        data: {
            usuarioId: usuarioId,
            articuloId: articuloId,
        },
    });

    await prisma.usuario.update({
        where: { id: usuarioId },
        data: { dinero: usuario.dinero - articulo.precio },
    });

    res.status(201).json(compra);
})

module.exports = router;