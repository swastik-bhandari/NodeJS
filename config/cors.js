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

module.exports = corsOptions;