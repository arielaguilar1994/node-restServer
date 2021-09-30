const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../DB/config.db');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user';

        // Conecting DB
        this.connectDb();

        // Middlewares
        this.middlewares();

        // Rutas de mi app
        this.routes();
    }

    async connectDb(){
        await dbConnection();
    }

    middlewares(){
        // CORS
        this.app.use( cors() );

        // Body read and parser
        this.app.use( express.json() );

        // Public directori
        this.app.use( express.static('public') );
    }

    routes() {
        // Conditional Middleware
        this.app.use( this.userPath, require('../routes/user') );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${ this.port }`);
        });        
    }
}

module.exports = Server;