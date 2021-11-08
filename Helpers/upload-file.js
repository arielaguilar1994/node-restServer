const path = require('path');
const { v4: uuidv4 } = require('uuid');

const saveFile = (files, 
                extensionValid = [ 'png', 'jpg', 'jpeg', 'git' ],
                folder = '' ) => {

    return new Promise( (resolve, reject) => {
        const { file } = files;
        const nameFile = file.name.split('.');
        const extension = nameFile[ nameFile.length - 1 ];
    
        if( !extensionValid.includes(extension) ){
            return reject(`The extension valid are ${ extensionValid }`);
        }
    
        const nameTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, nameTemp);
    
        file.mv(uploadPath, (err) => {
          if (err) {
            return reject(err);
          }
    
          return resolve( nameTemp );
        });
    });
}


module.exports = {
    saveFile,
}