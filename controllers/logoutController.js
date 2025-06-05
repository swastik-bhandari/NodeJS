const userDB = {
  users: require("../model/users.json"),
  setUsers: function(data) { this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req , res) => {
    // ADD THIS LINE - Refresh users from file
  delete require.cache[require.resolve("../model/users.json")];
  userDB.users = require("../model/users.json");
  
  const cookies = req.cookies;
  if(!cookies?.jwt) { console.log("no cookies send to the server"); return res.sendStatus(401); };

  const refreshToken = cookies.jwt;

  const foundUser = userDB.users.find(user => user.refreshToken === refreshToken);

  if(!foundUser) { console.log("token was not matched with any user in database"); return res.sendStatus(403); };// forbidden 

  //// clear cookie ////////
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: 'Lax'
    // Add 'secure: true' if you used it when setting the cookie (e.g., in production with HTTPS)
  });

  /// delete refreshToken from the database //////////
  const otherUsers = userDB.users.filter(user=>user.refreshToken!==refreshToken);

  foundUser.refreshToken = "";
  userDB.setUsers([...otherUsers , foundUser]);

  await fsPromises.writeFile(
    path.join(__dirname  , ".." , "model" , "users.json"),
    JSON.stringify(userDB.users)
  )
  console.log('logout successful');
 return res.sendStatus(204); // 204 - everything is alright but no content to send . 
}

module.exports= {handleLogout};