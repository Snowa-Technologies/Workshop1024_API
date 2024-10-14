require('dotenv/config');
const jwt = require('jsonwebtoken');
const cryptoJS = require("crypto-js");
const { GLOBALS_MAPUTILS, GLOBALS_ERRORS } = require('../global/globals.js');

const login = async(req, res) => {
    const { username, password } = req.body;

    if(!username || !password){     //Validate the request body
        return res.status(GLOBALS_ERRORS.HTTP_STATUS.BAD_REQUEST).json(GLOBALS_ERRORS.ERRORS.INVALID_REQUEST_PARAMS);
    }
    try{
       const clientData = GLOBALS_MAPUTILS.loginClient(username, password); //Authenticate user credentials with json data
       if(clientData){ // Generating cookie with client data
            const session = {orgId : clientData.code, bid : clientData.code + '_' + clientData.bid, uname: clientData.un, type : clientData.ftype , t_stamp : new Date() }; //TODO bid should changed dynamically multiple branches scenario
            const authtoken = jwt.sign(cryptoJS.AES.encrypt(JSON.stringify(session), process.env.COOKIE_ENC_KEY).toString(), process.env.SECRET_KEY);
            res.cookie('token', authtoken, { httpOnly: true, secure : true, path :'/', sameSite: 'None', maxAge : 3600000 });

            return res.status(GLOBALS_ERRORS.HTTP_STATUS.OK).json({session, clientData});
       }
    }catch(error){
        console.error('SNOWA_ERROR:: Error authenticating user : ', error.message);
        return res.status(GLOBALS_ERRORS.HTTP_STATUS.INTERNAL_SERVER_ERROR).json(GLOBALS_ERRORS.ERRORS.AUTHENTICATION_FAILED);
    }
    return res.status(GLOBALS_ERRORS.HTTP_STATUS.UNAUTHORIZED).json(GLOBALS_ERRORS.ERRORS.UNAUTHORIZED);
};

module.exports = { login };