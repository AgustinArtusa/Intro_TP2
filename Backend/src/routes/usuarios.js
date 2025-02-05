const { PrismaClient } = require('@prisma/client')
const express = require('express')
const router = express.Router()

const prisma = new PrismaClient()

router.get('/buscar', async (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ message: "Falta el username" });
    }

    const usuario = await prisma.usuario.findFirst({
        where: { username }
    });

    if (usuario) {
        return res.json({ exists: true });
    } else {
        return res.json({ exists: false });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const usuario = await prisma.usuario.findFirst({
        where: {
            username: username,
        }
    });

    if (!usuario || usuario.contraseña !== password) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    req.session.user = {
        id: usuario.id,
        username: usuario.username,
        rol: usuario.rol,
    };

    res.status(200).json({ message: 'Login exitoso', user: req.session.user });

});

router.get('/info', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'No hay sesión activa' });
    }
    return res.status(200).json({ user: req.session.user });
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar sesión' });
        }
        res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    });
});

router.get('/', async (req, res) => {
    const usuarios = await prisma.usuario.findMany({
        orderBy: {
            id: 'asc'
        }
    })
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
            telefono: req.body.telefono,
            rol: req.body.rol
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


    if (usuario.rol === 'comprador') {
        const compraExistente = await prisma.compra.findFirst({
            where:{
                usuarioId: usuario.id
            }
        })

        if (compraExistente !== null){
            await prisma.compra.deleteMany({
                where: {
                    usuarioId: usuario.id
                }
            })
        }
        
    }

    if (usuario.rol === 'vendedor'){

        const articulos = await prisma.articulo.findMany({
            where: {
                numero_vendedor: usuario.id,
                EnVenta: true
            }

        })

        if(articulos.length > 0){

            await prisma.compra.deleteMany({
                where:{
                    articuloId: {
                        in: articulos.map(articulo => articulo.id)
                    }
                }
            })

            await prisma.articulo.deleteMany({
                where: {
                    numero_vendedor: usuario.id,
                    EnVenta: true
                }
            })
        }
        
        
    }

    if (usuario.rol === 'admin'){
        await prisma.compra.deleteMany({
            where:{
                usuarioId: usuario.id
            }
        })

        const articulos = await prisma.articulo.findMany({
            where:{
                numero_vendedor: usuario.id,
                EnVenta: true
            }
        })

        if(articulos.length > 0){
            await prisma.compra.deleteMany({
                articuloId: {
                    in: articulos.map(articulo => articulo.id)
                }
            })

            await prisma.articulo.deleteMany({
                numero_vendedor: usuario.id,
                EnVenta: true
            })
        }
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
            telefono: req.body.telefono,
            rol: req.body.rol
        }
    })
    res.send(usuario)
})

router.get('/:id/articulos', async (req, res) => {

    const usuario = await prisma.usuario.findUnique({
        where:{
            id: parseInt(req.params.id)
        },
        include: {
            compras: true
        }
    });

    const compras = await prisma.compra.groupBy({
        by: ['articuloId'],
        where: { usuarioId: usuario.id },
        _count: { articuloId: true },
    });

    if (usuario === null){
        res.sendStatus(404)
        return;
    }

    const articulos = await Promise.all(
        compras.map(async (compra) => {
            const articulo = await prisma.articulo.findUnique({
                where: { id: compra.articuloId },
            });
            return { ...articulo, cantidad: compra._count.articuloId };
        })
    );

    res.json(articulos);
})

router.post('/:id/articulos', async (req,res) => {
    const usuario = await prisma.usuario.findUnique({
        where:{
            id: parseInt(req.params.id)
        }
    });

    if (usuario === null){
        res.sendStatus(404).send("Usuario no encontrado")
        return;
    }

    const articulo = await prisma.articulo.findUnique({
        where:{
            id: parseInt(req.body.articuloId)
        }
    });

    if (articulo === null){
        res.sendStatus(404).send("Articulo no encontrado")
        return;
    }
   
    const vendedor = await prisma.usuario.findUnique({
        where:{
            id: articulo.numero_vendedor
        }
    })

    if(!vendedor) {
        return res.status(404).send("Vendedor no encontrado");

    }


    if (parseFloat(usuario.dinero) < parseFloat(articulo.precio)) {
        return res.status(400).send("No hay suficiente dinero para comprar el artículo");
    }

    const nueva_cantidad = parseInt(articulo.cantidad) - 1;

    
    await  prisma.compra.create({
        data: {
            usuarioId: usuario.id,
            articuloId: articulo.id
        }
    })

    await prisma.articulo.update({
        where:{
            id: articulo.id
        },
        data: {
            cantidad: nueva_cantidad
        }
    })

    await prisma.usuario.update({
        where: {
            id: usuario.id
        },
        data: {
            dinero: usuario.dinero - articulo.precio
        }
    })

    await prisma.usuario.update({
        where:{
            id: vendedor.id
        },
        data:{
            dinero: parseFloat(vendedor.dinero) + parseFloat(articulo.precio)
        }
    })

    const disponibilidad = await prisma.disponibilidad.findFirst({
        where:{
            articuloId: articulo.id,
            disponible: true
        }
    });
    
    if (nueva_cantidad === 0 && disponibilidad) {

        await prisma.disponibilidad.update({
            where: {
                id: disponibilidad.id
            },
            data: {
                disponible: false
            }
        });

        await prisma.articulo.update({
            where:{
                id: articulo.id
            },
            data:{
                EnVenta:false
            }
        })
    }


    res.sendStatus(201)
});


module.exports = router