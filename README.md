# Librerias instaladas
 - express
 - dotenv
 - cors
 - mongoose
 - bcryptjs
 - express-validator
 - express-fileupload
 - UUID
 - cloudinary - [Cloudinary](https://cloudinary.com/)

 # Connection String
 - Configurada en heroku cli
 - Ver variables ```heroku config```
 - Set variable ```heroku config:set NombreVariable="ValorVariable"```
 - Video 133 Curso Node Udemy
  
  # Deploy en master
  - CMD ```git push heroku master```

  # View logs
  - CMD ```heroku logs -n "Cantidad de logs a ver"```
  - CMD ```heroku logs -n "Cantidad de logs a ver" --tail``` logs en tiempo real

  # Generate Documentation
  - Generar la documentacion de la api a travez de postman en el video 161 