const passwordValidator = require('password-validator');

//Reinforced password scheme
const passwordSchema = new passwordValidator();

//Strong password device
passwordSchema
.is().min(8)                                    // Longueur min 8
.has().uppercase()                              // Min une majuscule
.has().lowercase()                              // Min une minuscule
.has().digits()                                 // Min un chiffre
.has().not().spaces()                           // Pas d'espace
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist

module.exports = passwordSchema;