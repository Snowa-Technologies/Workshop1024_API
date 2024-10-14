require('dotenv/config');

/**
 * This function is to get the order collection name based on fee type
 */
const getOrderCollectionName = (clientData) => {
    if (clientData.ftype === process.env.FEE_T1) {
        return `${process.env.T1_ORDER_MODEL}_${clientData.dbgroup}`;
    }
    else if (clientData.ftype === process.env.FEE_T2) {
        return `${process.env.T2_ORDER_MODEL}_${clientData.dbgroup}`;
    }
    else if (clientData.ftype === process.env.FEE_T3) {
        return `${process.env.T3_ORDER_MODEL}_${clientData.dbgroup}`;
    }
    else if (clientData.ftype === process.env.FEE_T4) {
        return `${process.env.T4_ORDER_MODEL}_${clientData.dbgroup}`;
    }
    else if (clientData.ftype === process.env.FEE_T5) {
        return `${process.env.T5_ORDER_MODEL}_${clientData.dbgroup}`;
    }
    else if (clientData.ftype === process.env.FEE_T6) {
        return `${process.env.T6_ORDER_MODEL}_${clientData.dbgroup}`;
    }
    throw new Error('Invalid clientData.ftype');
};
/**
 * This function is to get the user details collection name based on fee type
 */
const getUserCollectionName = (clientData) => {
    if (clientData.ftype === process.env.FEE_T1) {
        return `${process.env.T1_USER_MODEL}_${clientData.dbgroup}`;
    }
    else if (clientData.ftype === process.env.FEE_T2) {
        return `${process.env.T2_USER_MODEL}_${clientData.dbgroup}`;
    }
    else if(clientData.ftype === process.env.FEE_T3){
        return `${process.env.T3_USER_MODEL}_${clientData.dbgroup}`;
    }
    else if(clientData.ftype === process.env.FEE_T4){
        return `${process.env.T4_USER_MODEL}_${clientData.dbgroup}`;
    }
    else if(clientData.ftype === process.env.FEE_T5){
        return `${process.env.T5_USER_MODEL}_${clientData.dbgroup}`;
    }
    else if(clientData.ftype === process.env.FEE_T6){
        return `${process.env.T6_USER_MODEL}_${clientData.dbgroup}`;
    }
    throw new Error('Invalid clientData.ftype');
};
/**
 * This function is to get the user details collection name based on fee type
 */
const getFeeCollectionName = (clientData) => {
    if (clientData.ftype === process.env.FEE_T1) {
        return `${process.env.T1_FEE_MODEL}_${clientData.dbgroup}`;
    } else if (clientData.ftype === process.env.FEE_T2) {
        return `${process.env.T2_USER_MODEL}_${clientData.dbgroup}`;
    } else if (clientData.ftype === process.env.FEE_T4) {
        return `${process.env.T4_USER_MODEL}_${clientData.dbgroup}`;
    }
   
    throw new Error('Invalid clientData.ftype');
};

module.exports = { getOrderCollectionName, getUserCollectionName, getFeeCollectionName };