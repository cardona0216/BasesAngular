//aqui va a estar los controladores de la rutas
const { response } = require('express');
const Usuario = require('../models/Usuario');

const {generarJWT} = require ('../helpers/jwt')

//vamos a encrptar la contarseña
//primero bsucamos el paquete que ya tenemos el bcrypt

const bcrypt = require('bcryptjs')


const CrearUsuario = async(req,res = response)=>{
  
    //usualmente a esto se le conoce como el controlador de esta ruta
    const { email,nombre,password } = req.body

    try {
    //Verificar el email

    const usuario = await Usuario.findOne({email})

    if (usuario) {
        console.log(usuario);
        return res.status(400).json({
            ok:false,
            msg:'El usuario ya existe con ese email'
        })
    }

    //crear usuario con el modelo

     const dbUser = new Usuario(req.body)
        
    //encriptar la contraseña o (hashsear la contraseña)


    const salt =bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password,salt) // conesto hacesmos el haseo de la contraseña

    //generar el JWT
    // el jwkt es una forma de autenticacion pasiva

    const token = await generarJWT(dbUser.id,nombre)

    //crear usuario de base de datos
     await dbUser.save()

    //generar respuesta exitosa

    return res.status(201).json({
        ok:true,
        iud: dbUser.id,
        nombre,
        email,
        token
      
    })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: 'Ocurrio un error hable con el adminstrador'
         })
    }


  
   
}


 const LoginUsuario = async(req,res = response)=>{

    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({
    //         ok:false,
    //         errors:errors.mapped()
    //     });
    // }
    //usualmente a esto se le conoce como el controlador de esta ruta, esto lo terminaremos moviendo a otra ruta
    //por que le controlador puede crecer bastante
const {email,password} = req.body;

try {

    const dbUser = await Usuario.findOne({email})

    if (!dbUser) {
        return res.status(400).json({
            ok:false,
            msg:'el email no existe'       
         })
    }

    //confirmar si el password si hace match

    const validarpassword = bcrypt.compareSync(password, dbUser.password)

    if (!validarpassword) {
        return res.status(400).json({
            ok:false,
            msg:'las contraseñas no son validas'
        })
        
    }
    //generar le jwt
    
    const validar = await generarJWT(dbUser.id,dbUser.nombre)

    //respuesta del servicio

         res.status(201).json({
            ok:true,
            uid: dbUser.id,
            nombre:dbUser.nombre,
            email,
            validar
        })
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok:false,
                msg:'problema serio hable con el administrador'
            })
        
    }




  
}

 const RevalidarToken = async(req,res = response) => {

    const {uid,name} = req;

    //leer la base de datos

    const dbUser = await Usuario.findById(uid)

    const newJWT = await generarJWT(uid,name)

    // const salt =bcrypt.genSaltSync();
    // newtoken = bcrypt.hashSync(uid,salt)

        return res.json({
            ok:true,
            uid,
            name,
            email:dbUser.email,
            newJWT
           
        
         })
    }

//necesitamos exportar este archivo

module.exports = {
    CrearUsuario,
    LoginUsuario,
    RevalidarToken
}