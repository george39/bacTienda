var express = require('express');
const bcrypt = require('bcryptjs');

var app = express();

var Usuario = require('../models/usuario');



// ***********************************************************
// OBTENER TODOS LOS USUARIOS
// ***********************************************************
app.get('/', (req, res, next) => {

    Usuario.find({}, 'nombre role')
        .exec(
            (err, usuarios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuario',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });
            });
});



// ***********************************************************
// CREAR UN NUEVO USUARIO
// *********************************************************** 
app.post('/', (req, res) => {
    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        nik: body.nik,
        role: body.role,
        password: bcrypt.hashSync(body.password, 10)
    });

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            usuario: usuarioGuardado
        });
    });

});



module.exports = app;