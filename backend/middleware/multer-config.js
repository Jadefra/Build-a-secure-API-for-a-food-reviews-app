const multer = require('multer'); 

//Dictionary MINE_TYPES
const MIME_TYPES = { 
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//Managing files sent with HTTP requests to our API (img)
const storage = multer.diskStorage({ 
  destination: (req, file, callback) => { 
    callback(null, 'images'); 
  },
  filename: (req, file, callback) => {
    let name = file.originalname.split(' ').join('_'); 
    const extension = MIME_TYPES[file.mimetype]; 
    name = name.replace("." + extension, "_");
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image'); 