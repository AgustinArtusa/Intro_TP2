const { PrismaClient } = require('@prisma/client')
const express = require('express');
const router = express.Router();

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const tiendas = await prisma.tienda.findMany()
    res.json(tiendas);
});




module.exports = router;