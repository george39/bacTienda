var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Usuario = require('../models/usuario');

var app = express();

app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ nik: body.nik }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario'
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al autenticar',
                errors: err
            });
        }


        // COMPARAR CONTRASEÑAS
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas',
                errors: err
            });
        }

        // Crear un token
        usuarioDB.password = ':)';
        var token = jwt.sign({ usuario: usuarioDB }, '@este-es-un-dificil', { expiresIn: 14400 }); // 4 horas

        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id
        });
    });
});



module.exports = app;