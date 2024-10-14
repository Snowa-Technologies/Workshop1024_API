const generalUtils = require("../global/utils");
const validators = require("../global/validatorUtil");
const authUtil =  require("../global/authUtil");
const collectionNames = require("../global/collectionUtil");
const errorCodes = require("../global/errorCodes");
const fieldMappings = require("../global/fieldMappings");

module.exports =  {
    GLOBALS_UTILS : generalUtils,
    GLOBALS_VALIDATEUTILS :  validators,
    GLOBALS_AUTHUTILS : authUtil,
    GLOBAL_COLLECTIONUTILS : collectionNames,
    GLOBALS_ERRORS : errorCodes,
    GLOBALS_MAPUTILS :  fieldMappings
}