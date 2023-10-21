//aqui vamosa atrabajar con todo lo realciona con la creacion y verificacion de los jwt

//debemos de importar el paquete
const jwt = require('jsonwebtoken')


// cuando  llame esta funcion espero recibir el uid(userid) y el name del Usuario
const generarJWT = (uid, name)=> {

    const payload = {uid, name}

    //voy a generar una promesa

    return new Promise((resolve,reject)=>{
            // denro del jwt.sign( colocare mi firma) despues de la , (coma va le  secretOrPrivateKey)
        jwt.sign(payload,process.env.SECRET_JWT_SEED,{
            expiresIn:'12h'
        },(err,token)=>{

            if (err) {
                //todo bien
                console.log(err);
                reject(err)
            } else {
                // todo mal

                resolve(token)
            }
        
        })


    })

}


module.exports = {
    generarJWT
}




