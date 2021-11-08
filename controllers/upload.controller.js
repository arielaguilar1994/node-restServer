const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { request, response } = require("express");
const { saveFile } = require("../helpers");
const { User, Product } = require('../models');

const save = async(req = request, res = response) => {

    try {
      const nameFile = await saveFile( req.files, undefined, 'imgs' );
      
      res.json({
        nameFile
      });

    } catch (msg) {
       res.status(400).json({
        msg
       });
    }
}

const uploadFile = async(req = request, res = response) => {
  
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if( !model ){
        return res.status(400).json({
          msg: `Not exist user with id: ${ id }`
        });
      }

    break;
    case 'products':
      model = await Product.findById(id);
      if( !model ){
        return res.status(400).json({
          msg: `Not exist product with id: ${ id }`
        });
      }
        
    break;
  
    default:
      return res.status(500).json({ msg: 'I forget validate this' })
  }

  // clean previous img
  if( model.img ){
    // delete img from server
    const pathImg = path.join( __dirname, '../uploads', collection, model.img );
    if( fs.existsSync(pathImg) ){
      fs.unlinkSync(pathImg);
    }
  }

  const name  = await saveFile(req.files, undefined, collection);
  model.img = name;

  await model.save();

  res.json(model);
}

const getImage = async(req = request, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if( !model ){
        return res.status(400).json({
          msg: `Not exist user with id: ${ id }`
        });
      }

    break;
    case 'products':
      model = await Product.findById(id);
      if( !model ){
        return res.status(400).json({
          msg: `Not exist product with id: ${ id }`
        });
      }
        
    break;
  
    default:
      return res.status(500).json({ msg: 'I forget validate this' })
  }

  // clean previous img
  if( model.img ){
    // delete img from server
    const pathImg = path.join( __dirname, '../uploads', collection, model.img );
    if( fs.existsSync(pathImg) ){
      return res.sendFile(pathImg);
    }
  }

  const defaultImg = path.join( __dirname, '../assets', 'no-image.jpg' );
  return res.sendFile(defaultImg);
}

const uploadFileCloudinary = async(req = request, res = response) => {
  
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if( !model ){
        return res.status(400).json({
          msg: `Not exist user with id: ${ id }`
        });
      }

    break;
    case 'products':
      model = await Product.findById(id);
      if( !model ){
        return res.status(400).json({
          msg: `Not exist product with id: ${ id }`
        });
      }
        
    break;
  
    default:
      return res.status(500).json({ msg: 'I forget validate this' })
  }

  // clean previous img
  if( model.img ){
    const nameArr = model.img.split('/');
    const name = nameArr[ nameArr.length - 1 ];
    const [ public_id ] = name.split('.');
    await cloudinary.uploader.destroy( public_id );
  }

  const { tempFilePath } = req.files.file;
  const { secure_url  } = await cloudinary.uploader.upload( tempFilePath );
  model.img = secure_url;

  await model.save();

  res.json(model);
}

module.exports = {
  save,
  uploadFile,
  getImage,
  uploadFileCloudinary,
}