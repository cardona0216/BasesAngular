


// aqui vamos a validar los token de la app

const { response } = require("express")
const jwt = require('jsonwebtoken')

const validarJWT = (req,res = response, next )=>{
  //    aqui vamos a validar si el jsonwebtoken que el usario tiene el la app sigue sinedo vigente
    // vamos a leer el token que viene de la req
    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'error en el token'
        })

    }

    try {

     const{uid, name} =   jwt.verify(token, process.env.SECRET_JWT_SEED);
     console.log(uid,name);
     req.uid = uid
     req.name = name
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'token no valido'
        })
    }


    //todo ok

    next()

}


module.exports = {
    validarJWT
}