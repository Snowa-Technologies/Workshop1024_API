module.exports = {
    HTTP_STATUS: {
        OK: 200,
        NO_CONTENT: 204,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN : 403,
        NOT_FOUND: 404,
        CONFLICT : 409,
        INTERNAL_SERVER_ERROR: 500,
    },
    ERRORS: {
        UNAUTHORIZED :{
            code : 'UZ',
            message : 'Unauthorized user access. Please authenticate and try again.'
        },
        FORBIDDEN :{
            code : 'FB',
            message : 'Unable to process payment at this time.'
        },
        BAD_REQUEST :{
            code : 'BR',
            message : 'Invalid request'
        },
        INVALID_CAPTCHA: {
            code: 'IC',
            message: 'Invalid captcha.',
        },
        INVALID_REQUEST_PARAMS: {
            code: 'IRP',
            message: 'Invalid request parameters.',
        },
        INVALID_AMOUNT: {
            code: 'IAM',
            message: 'Invalid transaction amount.',
        },
        INVALID_ORDER: {
            code: 'IO',
            message: 'Invalid order.',
        },
        USER_NOT_FOUND :{
            code : 'UNF',
            message : 'User does not exist'
        },
        CLIENT_NOT_FOUND :{
            code : 'CNF',
            message : 'Unauthorized Access'
        },
        INTERNAL_SERVER_ERROR :{
            code : 'IS',
            message : 'Internal server error.'
        },
        AUTHENTICATION_FAILED :{
            code : 'AF',
            message : 'User Authetication Failed'
        },
        ORDER_TRANSACTION_ERROR :{
            code : 'OR',
            message : 'Error creating order or transaction.'
        },
        REDIRECT_DEFAULT :{
            value : 'Invalid cookie',
            action : 'REDIRECT_DEFAULT'
        },
        FAILED_TO_INSERT :{
            value : 'FTI',
            action : 'Failed to save the data.'
        },
        IMAGE_NOT_FOUND :{
            code : 'INF',
            message : 'Image does not exist'
        },
    },
};