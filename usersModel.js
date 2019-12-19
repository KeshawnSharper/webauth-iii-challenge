const db = require('./data/dbConfig');

function getUsers(desc){
    return db("users").select("id","username","department").where({"department":desc})
}
function register(user){
    return db("users").insert(user)
}
function login(user)
   { 
       return db("users").select("id","username").where(user.username)
   }
   function getUser(user){
       return db("users").where({"username":user})
   }

module.exports = {
    getUsers,
    getUser,
    register,
    login
}