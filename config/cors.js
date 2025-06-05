const whiteList = [
  'http://localhost:3500' ,
  'https://www.google.com'
];

const corsOptions = {
  origin : (origin , callback) => {
    if( whiteList.includes(origin)) {
      callback(null , true);
    }
    else {
      callback(new Error('Not allowed by CORS') , false);
    }
  },
  credentials : true,
  methods : ['POST', 'GET','DELETE', 'PUT']
}

const credentials = (req , res , next)=> {
  const origin = req.headers.origin;
  if(whiteList.includes(origin)) {
    res.header("Access-Control-Allow-Credentails" , true);
  }
  next();
}

module.exports = { corsOptions, credentials};