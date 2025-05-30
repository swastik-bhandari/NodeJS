const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500; // Use || instead of |

console.log('hello world');

app.use(logger , author);


// Route for "/", "/index", or "/index.html"
app.get( ['/' , '/index' , '/index.html'], (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

function logger(req , res , next) {
  console.log('first middleware');
  next();
}

function author(req , res , next) {
  console.log('second middleware');
  next();
}
// Route for "/new-page" or "/new-page.html"
app.get(['/new-page' , '/new-page.html'],(req , res , next)=> {
  console.log('third middleware');
  next();
}, (req, res) => {
  console.log('forth middleware');
  res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
});

// Route for "/old-page" or "/old-page.html" (should redirect)
app.get(['/old-page', '/old-page.html'], (req, res) => {
  console.log('Redirecting from old page...');
  res.redirect(301, '/index.html'); // 301 = Permanent redirect
});
console.log('hello');
app.get( /\/*/ , (req , res)=> {
res.status(404).sendFile(path.join(__dirname , '..', 'views' , '404.html'));
});
console.log('helloooo');
// Start server
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT: ${PORT}`);
});
