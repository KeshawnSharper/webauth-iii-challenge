const express = require('express');
const bcrypt = require("bcryptjs")
const db = require('./usersModel')
const auth = require("./auth")
const router = express.Router();
const jwt = require("jsonwebtoken")
const secret = require("./secrets")

// router.get("/token",(req,res) => {
//   const user = req.header.user
//   const token = generateToken(user)
//   return jwt.sign(token)
//   })
// router.get("/token",(req,res) => {
// const token = jwt.sign({
//   token:"here it is",
//   exp:1000 * 60 * 5
// },"secret")
// res.status(400).json(token)
// })
router.get("/token",(req,res) => {
  const payload = {
    subject:"1",
    username:"aaron"
  }
  const options = {
    expiresIn:"1d"
  }

 res.json(jwt.sign(payload,secret.jwtSecret,options)) 
  })


router.get('/users',auth,(req, res) => {
    console.log(req.headers)

    db.getUser(req.decodedJwt.username)
    .first()
    .then(i => {
        db.getUsers(i.department)
        .then(i => res.status(200).json(i))
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
  });
  
router.post('/register', (req, res) => {
    let user = req.body
    let hash = bcrypt.hashSync(user.password,13)
    user.password = hash 
db.register(user)
.then(i => {
  res.status(201).json(i);
})
.catch(err => {
  res.status(500).json({ message: 'Failed to get schemes' });
});
  });

  router.post('/login', (req, res) => {
    let body = req.body
    console.log(body)
    db.getUser(body.username)
    .first()
    .then(user => {
      const payload = {
        userid:user.id,
        username:user.username
      }
      const options = {
        expiresIn:"1d"
      }
      const token = jwt.sign(payload,secret.jwtSecret,options)
      if (user && bcrypt.compareSync(body.password,user.password))
      {res.status(200).json({message:`Welcome ${body.username}`,token:token})}
     else {
       res.status(404).json({message:`invalid creditinials`})
     }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get schemes' });
      console.log(err)
    });
  });
 

//   router.get('/ingredients/:id/recipes', (req, res) => {
//     recipe.getIngredients(req.params.id)
//     .then(schemes => {
//       res.json(schemes);
//     })
//     .catch(err => {
//       res.status(500).json({ message: 'Failed to get schemes' });
//     });
//   });
  

module.exports = router