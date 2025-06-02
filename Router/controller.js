const express = require('express');


const getAllProducts = async (req ,res )=> {
  try { 
  await res.send('hello , how are you ');
  } catch (err){
    console.error(" error occured");
  }
}

const getAllProductTested = async ( req , res)=> {
  try {
  await res.send('everything is tested');
  } catch {
    console.log('error in testing');
  }
}

module.exports = {getAllProducts , getAllProductTested};