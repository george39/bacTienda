// SERVIDOR EXPRESS

// Requires
var express = require('express');


// Inicializar variables
var app = express();



// Rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
});





// Escuchar peticiones
app.listen(3000, () => {
    // Muestra la palabra online en otro color
    console.log('Servidor express corriendo en el puerto 3000: \x1b[41m%s\x1b[0m', ' online');
});