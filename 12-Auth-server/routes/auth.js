//aqui van  a estar todas las rutas que tengan que ver con autenticacion

// para comenzar necesitare exportar algo  y de alguna manera tener una relacion con el archivo index.js
// eso lo aprenderemos en este video

//necsito importa algo de express vamos a desestrecturar algo aqui
//vamos a ocupar del paquete de express el Router

const { Router } = require('express');
const { check } = require('express-validator');
const { CrearUsuario, LoginUsuario, RevalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

//nota: casi todo lo que se expone de express son funciones que yo tengo que ejecutar

const router = Router()


//ahora definamos las rutas que vamos a necesitar


//ruta para crear usuario
router.post('/new',[
    check('nombre', 'el campo nombre es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria').isLength({ min:6 }),
    validarCampos
], CrearUsuario);


//ruta para login usuario
router.post('/',[
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'la contraseña es incorrecta').isLength({ min:6 }),
        validarCampos
    ], LoginUsuario);
    

// validar y revalidar token
router.get('/renew',validarJWT, RevalidarToken)


// aqui en node para exportar las cosas y que puedan ser usadas en otros archivos de hace de un manera diferente 
// a como la veniamos haciaenod en angular

module.exports = router;

//este archivio se encuatra exportado pero por ahora no esta haciendo nada, de alguna manera se necesita hacer una relacion 
// con el indexedDB.js