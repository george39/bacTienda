var express = require('express');
const bcrypt = require('bcryptjs');

var app = express();

var Usuario = require('../models/usuario');



// ***********************************************************
// OBTENER TODOS LOS USUARIOS
// ***********************************************************
app.get('/', (req, res, next) => {

    Usuario.find({}, 'nombre nik role')
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


// ***********************************************************
// ACTUALIZAR UN USUARIO
// ***********************************************************
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id' + id + 'no existe',
                errors: { message: 'No existe un usuario con ese id' }
            });
        }

        usuario.nombre = body.nombre;
        usuario.nik = body.nik;
        usuario.role = body.role;


        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = ':)';

            res.status(200).json({
                ok: true,
                usuarios: usuarioGuardado
            });
        });
    });

});



// ***********************************************************
// ELIMINAR UN USUARIO
// ***********************************************************
app.delete('/:id', (req, res) => {

    var id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar usuario'
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con ese id',
                errors: { message: 'No existe un susuario con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});



module.exports = app;