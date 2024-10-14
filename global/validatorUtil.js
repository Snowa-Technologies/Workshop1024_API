require('dotenv/config');
const Joi = require('joi');

/**
 * This function is to validate the unstructured fee schema
 */
const schemaUSTR = Joi.object({
    bills : Joi.required(),
    amount : Joi.required(),
})

// Define the fee schema
const feeSchema = Joi.object({
    f_id: Joi.string().required(),
    f_nm: Joi.string().required(),
    f_tp: Joi.string().required(),
    amount: Joi.number().greater(0).required()
});

/**
 * This function is to validate the structured fee schema
 */
const schemaSTR = Joi.object({
    lt_fee: Joi.number().required(),
    amount: Joi.number().greater(0).required(),
    fees: Joi.array().items(feeSchema).required()
}).custom((value, helpers) => {
    // Validate the t_amount matches the sum of the amounts in the fees array
    const totalFeesAmount = value.fees.reduce((sum, fee) => sum + fee.amount, 0);
    if (value.amount - value.lt_fee !== totalFeesAmount) {
        return helpers.message('Transaction amount does not match the sum of fees');
    }
    return value;
}, 'Custom validation for t_amount');

/**
 * This function is to validate the request data based on the fee type of the client
 */
function validateRequestParams(clientData, reqData){
    if(clientData.ftype === process.env.FEE_T1){
        const { error } = schemaSTR.validate(reqData);
        if(error){
            return false
        }
    }
    else if(clientData.ftype === process.env.FEE_T2){
        const { error } = schemaUSTR.validate(reqData);
        if(error){
            return false
        }
    }
    
    else{return false}
    return true;
}

module.exports = {
    validateRequestParams
}