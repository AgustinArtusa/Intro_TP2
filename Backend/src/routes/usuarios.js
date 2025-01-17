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

router.get('/:id/articulos', async (req, res) => {
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

router.post('/:id/articulos', async (req,res) => {
    const usuarioId = parseInt(req.params.id);
    const { articuloId } = req.body;
    
    if (!articuloId) {
        return res.status(400).json({message: 'Se requiere articuloId.'});
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

await prisma.disponibilidad.update({
    where: { id: disponibilidad.id },
    data: { disponible: false },
});

module.exports = router