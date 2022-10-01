//Creating a model with mongoose
const mongoose = require('mongoose'); 
require('mongoose-type-email');

//Addition of the validator plugin
const uniqueValidator = require('mongoose-unique-validator'); 
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

//Creation of the email template
const userSchema = mongoose.Schema({ 
  email: {
    type: String,
    unique: true,
    required: [true, "Veuillez entrer votre adresse email"],
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Veuillez entrer une adresse email correcte"]
  },
  password: {
    type: String,
    required: [true, "Veuillez choisir un mot de passe"]
  }
});

userSchema.plugin(uniqueValidator); 

userSchema.plugin(sanitizerPlugin); 

module.exports = mongoose.model('User', userSchema); 