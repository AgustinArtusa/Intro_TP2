const express = require('express');
const router = express.Router();

var articulos = [
    { 
      id: 1, 
      nombre: "Jarrón Antiguo", 
      precio: 1200, 
      descripcion: "Jarrón de porcelana del siglo XVIII", 
      origen: "China", 
      antiguedad: "300 años" 
    },
    { 
      id: 2, 
      nombre: "Espada Samurai", 
      precio: 2500, 
      descripcion: "Espada japonesa original de la era Edo", 
      origen: "Japón", 
      antiguedad: "400 años" 
    },
    { 
      id: 3, 
      nombre: "Reloj de Bolsillo", 
      precio: 800, 
      descripcion: "Reloj de bolsillo dorado del siglo XIX", 
      origen: "Suiza", 
      antiguedad: "150 años" 
    }
];

router.get('/', async (req, res) => {
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

module.exports = router;