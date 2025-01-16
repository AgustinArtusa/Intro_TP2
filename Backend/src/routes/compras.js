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
        res.sendStatus(404)
        return
    }
    res.json(compras)
})

module.exports = router;