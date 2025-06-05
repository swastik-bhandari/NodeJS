const userDB = {
  users : require("../model/users.json"),
  setUsers : function(data) {this.users = data }
}

const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises
const bcrypt = require("bcrypt");

const handleNewUser = async (req , res) => {
 const  {username , pwd} = req.body;
 if(!username || !pwd) return res.status(400).json({"message" : "username and password are required"});
 // check for dublicates username in DB
 const isDublicate = userDB.users.find(user=>user.username===username);
 if(isDublicate) {
 return res.status(409).json({"message" : "dublicate entries"});  // 409 for dublicate entries
 }
 try {
  // hashing the password
  const hashPassword = await bcrypt.hash(pwd ,10);
  // updating to database
  const newUser = {"username" : username , "password" : hashPassword};
  userDB.setUsers([...userDB.users , newUser]);
  console.log(userDB.users);

  await fsPromises.writeFile(
    path.join(__dirname , '..' , 'model','users.json') ,
    JSON.stringify(userDB.users)
  );

  res.json({"message" : `new user ${username} is being created`});

 } catch(err) {
  return res.status(500).json({"message" : err});
 }
}

module.exports = {handleNewUser};