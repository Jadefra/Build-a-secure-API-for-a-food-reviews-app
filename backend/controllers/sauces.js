// Controller stuff (business logic)

const Sauce = require('../models/sauce'); 

const fs = require('fs'); 

//Save "post" sauce by user
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce); 
  delete sauceObject._id; 
  delete sauceObject._userId; 
  const sauce = new Sauce({ 
    ...sauceObject, 
    userId: sauceObject.userId, 
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, 
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
  sauce.save() 
    .then(
      () => 
      { res.status(201).json({ 
          message: 'Sauce enregistré !'
      })}) 
    .catch(
      error => 
      { res.status(400).json({ 
          error 
      })});
}; 

//Get a specific sauce when clicked
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ 
    _id: req.params.id
  }).then( 
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

//PUT to modify an existing sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? { 
      ...JSON.parse(req.body.sauce), 
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body }; 
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) 
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'})) 
    .catch(error => res.status(401).json({ error }));
};

  exports.deleteSauce = (req, res, next) => { 
  Sauce.findOne({_id: req.params.id}) 
      .then(sauce => { 
      const filename = sauce.imageUrl.split('/images/')[1]; 
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id }) 
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

//Delete a sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})  
    .then(sauce => { 
      const filename = sauce.imageUrl.split('/images/')[1]; 
      fs.unlink(`images/${filename}`, () => { 
        Sauce.deleteOne({_id: req.params.id}) 
          .then(() => res.status(200).json({message: 'Sauce supprimé !'}))
          .catch(error => res.status(401).json({ error }));
        });
    })
    .catch(error =>
        res.status(500).json({ error
    }));
};

//Retrieves/displays all the sauces in the database
exports.getAllSauce = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

//To like or unlike a sauce
exports.likeDislike = (req, res, next) => {
  // Like already now
  let like = req.body.like 
  let userId = req.body.userId 
  let sauceId = req.params.id 

  if (like === 1) { 
    Sauce.updateOne({
        _id: sauceId
      }, {
        //Adding the user and inserting a like to the counter
        $push: {
          usersLiked: userId
        },
        $inc: {
          likes: +1
        },
      })
      .then(() => res.status(200).json({
        message: 'Like ajouté'
      }))
      .catch((error) => res.status(400).json({
        error
      }))
  }
  if (like === -1) {
    Sauce.updateOne(
        {
          _id: sauceId
        }, {
          $push: {
            usersDisliked: userId
          },
          $inc: {
            dislikes: +1
          },
        }
      )
      .then(() => {
        res.status(200).json({
          message: 'Dislike ajouté !'
        })
      })
      .catch((error) => res.status(400).json({
        error
      }))
  }
  if (like === 0) { 
    Sauce.findOne({
        _id: sauceId
      })
      .then((sauce) => {
        if (sauce.usersLiked.includes(userId)) { 
          Sauce.updateOne({
              _id: sauceId
            }, {
              $pull: {
                usersLiked: userId
              },
              $inc: {
                likes: -1
              }, 
            })
            .then(() => res.status(200).json({
              message: 'like retiré'
            }))
            .catch((error) => res.status(400).json({
              error
            }))
          }
        if (sauce.usersDisliked.includes(userId)) { 
          Sauce.updateOne({
              _id: sauceId
            }, {
              $pull: {
                usersDisliked: userId
              },
              $inc: {
                dislikes: -1
              }, 
            })
            .then(() => res.status(200).json({
              message: 'Dislike retiré'
            }))
            .catch((error) => res.status(400).json({
              error
            }))
        }
      })
      .catch((error) => res.status(404).json({
        error
      }))
  }
}   
        
        
