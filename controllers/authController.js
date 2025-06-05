const userDB = {
  users: require("../model/users.json"),
  setUsers: function(data) { this.users = data }
}

const express = require('express');
const router = express.Router();
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
  try {
    const { username, pwd } = req.body;
    
    console.log('=== LOGIN DEBUG ===');
    console.log('Login attempt for username:', username);
    
    if (!username || !pwd) {
      return res.status(400).json({ "message": "username and password required" });
    }
    
    const foundUser = userDB.users.find(user => user.username === username);

    if (!foundUser) {
      console.log('❌ User not found:', username);
      return res.status(401).json({ "message": "user not found" });
    }
    
    console.log('✅ User found:', foundUser.username);
    
    const match = await bcrypt.compare(pwd, foundUser.password);
    
    if (!match) {
      console.log('❌ Password mismatch for:', username);
      return res.status(401).json({ "message": "invalid password" });
    }

    console.log('✅ Password verified for:', username);

    // Create JWT tokens
    const accessToken = jwt.sign(
      { "username": foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { "expiresIn": "100s" }
    );
    
    const refreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { "expiresIn": "1d" }
    );

    console.log('✅ Tokens created');
    console.log('Refresh token preview:', refreshToken.substring(0, 50) + '...');

    // Update user with refresh token
    const otherUsers = userDB.users.filter(person => person.username !== foundUser.username);
    const currentUser = { ...foundUser, refreshToken };
    userDB.setUsers([...otherUsers, currentUser]);
    
    console.log('✅ User updated in memory');
    console.log('Updated user has refresh token:', !!currentUser.refreshToken);
    
    // Save to file system
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );

    console.log('✅ Users saved to file');

    // Verify the token was saved correctly
    const verifyUser = userDB.users.find(u => u.username === username);
    console.log('Verification - user has refresh token:', !!verifyUser?.refreshToken);
    console.log('Verification - token matches:', verifyUser?.refreshToken === refreshToken);

    // Set HTTP-only cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'Lax'
    });

    console.log('✅ Cookie set');
    console.log('=== LOGIN COMPLETE ===');

    return res.status(200).json({ accessToken });
    
  } catch (error) {
    console.error('❌ Login error:', error);
    return res.status(500).json({ "message": "Internal server error" });
  }
}

module.exports = { handleLogin };