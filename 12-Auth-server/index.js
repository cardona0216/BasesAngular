
//vamos a configurar el servidor de express
// aqui vamos a importar express recordar que en node se usa es require
// aqui no trabjamos con import a menos que estemos trabajando con typescrir

const express = require('express'); // express es el nombre del paquete
const cors = require('cors');
const path = require('path')
const { dbConnection } = require('./db/config');
require('dotenv').config();


//crear el servicor/aplicacion de express
const app = express();

//Base de datos

dbConnection()


//Directorio publico
app.use(express.static('public'))



// //GET vamos a hacer la primera peticion http
// app.get('/', (req,res) => {

//     res.status(404).json({
//     ok:true,
//     mensaje:'Todo estuvo ok!',
//     iud:12345
//    });

// })

//vamos a implemetar el cors

app.use(cors()) //Control de acceso HTTP (CORS): El Intercambio de Recursos de Origen Cruzado (CORS) es un mecanismo que utiliza cabeceras HTTP adicionales para permitir que un user agent (en-US) obtenga permiso para acceder a recursos seleccionados desde un servidor, en un origen distinto (dominio) al que pertenece. Un agente crea una petición HTTP de origen cruzado cuando solicita un recurso desde un dominio distinto, un protocolo o un puerto diferente al del documento que lo generó.


//lectura y parseo(trasformar), lo que viene en el body

app.use(express.json())

// ahora vamos a configurar las rutas

//Rutas, para configurar las rutas usamos algo que se comoce como un milderwer de express
app.use('/api/auth/',require('./routes/auth'));


//demas rutas

app.get('*', (req,res) => {
    res.sendFile(path.resolve( __dirname, 'public/index.html'))
})



//ahora vamos a levantar la aplicacin de express
app.listen(process.env.PORT, ()=>{
    console.log(`Servidor coriendo en puerto ${process.env.PORT}`);
})