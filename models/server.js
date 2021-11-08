const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');


const { dbConnection } = require('../DB/config.db');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.path = {
            authPath: '/api/auth',
            categoryPath: '/api/category',
            productPath: '/api/product',
            search: '/api/search',
            userPath: '/api/user',
            uploadFiles: '/api/uploads'
        };

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

        // fileUpload - Carga de Archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true // create folder if is not exist
        }));
    }

    routes() {
        // Conditional Middleware
        this.app.use( this.path.authPath, require('../routes/auth.router') );
        this.app.use( this.path.userPath, require('../routes/user') );
        this.app.use( this.path.productPath, require('../routes/products.router') );
        this.app.use( this.path.search, require('../routes/search.router') );
        this.app.use( this.path.categoryPath, require('../routes/categories.router') );
        this.app.use( this.path.uploadFiles, require('../routes/upload.router') );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${ this.port }`);
        });        
    }
}

module.exports = Server;