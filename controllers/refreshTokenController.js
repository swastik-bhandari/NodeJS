const userDB = {
  users: require("../model/users.json"),
  setUsers: function(data) { this.users = data }
}

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
  // ADD THIS LINE - Refresh users from file
  delete require.cache[require.resolve("../model/users.json")];
  userDB.users = require("../model/users.json");
  
  const cookies = req.cookies;
  
  if (!cookies?.jwt) {
    console.log('No JWT cookie found');
    return res.sendStatus(401);
  }

  const refreshToken = cookies.jwt;

  const foundUser = userDB.users.find(user => user.refreshToken === refreshToken);

  if (!foundUser) {
    console.log('User not found with this refresh token');
    return res.sendStatus(403);
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || foundUser.username !== decoded.username) {
        console.log('Token verification failed');
        return res.sendStatus(403);
      }

      // Valid refresh token, so create a new access token
      const accessToken = jwt.sign(
        { "username": decoded.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "100s" }
      );
      
      return res.json({ accessToken });
    }
  );
}

module.exports = { handleRefreshToken };