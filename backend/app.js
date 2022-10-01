//The overall logic of the application
const express = require('express'); 
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose'); 

const path = require('path'); 

const helmet = require('helmet'); 

const saucesRoutes = require('./routes/sauces'); 

const userRoutes = require('./routes/user'); 

mongoose.connect('You_need_my_password_for_the_MongoDB_database_to_work', 
  { useNewUrlParser: true, 
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();

//Security prevent malicious requests
//To unlock certain CORS security systems
app.use((req, res, next) => { 
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); 
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  next();
});

 
app.use(bodyParser.urlencoded({ 
  extended: true 
}));

app.use(bodyParser.json()); 

app.use(helmet({ crossOriginResourcePolicy: false }))

app.use('/images', express.static(path.join(__dirname, 'images'))); 


app.use('/api/sauces', saucesRoutes); 

app.use('/api/auth', userRoutes); 

module.exports = app; 






