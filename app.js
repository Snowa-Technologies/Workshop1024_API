const express = require("express");
const cookieParser = require('cookie-parser');
const cryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const campaignRoute =  require('./routes/campaignRoute');
const authRoute = require("./routes/authRoute.js");

//Server initialization
const app = express();


//Environment Variables
const PORT = process.env.PORT || 5000;

// Middleware to handle JSON data
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

// Middleware to handle CORS and check for allowed origins and specific cookie
const checkRequest = (req, res, next) => {
    let origin = req.headers.origin;
    if(!origin){
        origin = req.get('Host');
    }
    const token = req.cookies.token;

    let domainsArray = process.env.CROSS_DOMAIN.toLowerCase().split(',');
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        if (origin && domainsArray.some(domain => origin.toLowerCase().endsWith(domain))) {
            res.header('Access-Control-Allow-Origin', origin);
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            res.header('Access-Control-Allow-Credentials', 'true');
            return res.sendStatus(204); // No Content
        } else {
            return res.status(403).json({ error: 'Forbidden - Origin not allowed' });
        }
    }
    // Check if the origin is allowed
    if (origin && domainsArray.some(domain => origin.toLowerCase().endsWith(domain))) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', 'true');
        //Check if the end point is login
        if(req.originalUrl === '/api/v1/login'){
            return next();
        }
        // Check if the cookie exists
        if (token) {
            req.sdata = {};
            // Decode the cookie data
            jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
                const bytes = cryptoJS.AES.decrypt(user, process.env.COOKIE_ENC_KEY);
                try{
                  const obj = JSON.parse(bytes.toString(cryptoJS.enc.Utf8));
                  if(obj.orgId){
                    req.sdata["user"]  = JSON.parse(bytes.toString(cryptoJS.enc.Utf8));
                  }
                }catch(error){
                 console.error("Error in decode the cookie value");
                 res.status(403).json({error : "UnAuthorized access"}); 
                }
              });
            next(); 
        } else {
            // Cookie does not exist, send an error response
            res.status(403).json({ error: 'Forbidden - Missing required cookie' }); 
        }
    } else {
        // Origin not allowed, send an error response
        res.status(403).json({ error: 'Forbidden - Origin not allowed' }); 
    }
};

app.use(checkRequest);

app.use('/api/v1', campaignRoute);
app.use('/api/v1',authRoute);

app.get('/', (req, res)=> res.send("Workshop API is online."));

// Start the server
app.listen(PORT, (error)=>{
    if(!error)
        console.log("Workshop API is successfully running, and app is listening to port: "+ PORT);
    else
        console.log("Error occured, server can't start", error);
})