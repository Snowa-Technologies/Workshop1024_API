require('dotenv/config');
const { default: axios } = require('axios');
const cryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return; // Unauthorized if no token

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    const bytes = cryptoJS.AES.decrypt(user, process.env.COOKIE_ENC_KEY);
    try{
      const obj = JSON.parse(bytes.toString(cryptoJS.enc.Utf8));
      if(obj.userId && obj.orgId){
        req.sdata["user"]  = JSON.parse(bytes.toString(cryptoJS.enc.Utf8));
      }
    }catch(error){
     //TODO: Print error to sentry
    }
  });
};
/**
 *  This function is validate the captcha
 */
async function validateCaptcha(captchatoken){
  const captchaURL = process.env.GOOGLE_CAPTCH_URL;
  const secretKey = process.env.GOOGLE_RECAPTCHA_KEY;
  try {
      const response = await axios.post(captchaURL, null, {
          params: {
              secret: secretKey,
              response: captchatoken,
          }
      });
      if(!response.data.success){ 
          return false;
      }
      return true;
  } catch (error) {
      throw error;
  }
}

module.exports = { authenticateToken, validateCaptcha };
