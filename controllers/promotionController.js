const { GLOBALS_ERRORS} = require('../global/globals.js');
require("dotenv/config");

/**
 * Get collection names
*/ 
const promotionModel = process.env.PROMOTION_Model;
/**
 * Get promotions
 */
const getPromotions = async(req, res)=>{
    res.status('OK').json();
}

/**
 * Add new promotion
 */
const addPromotion = async (req, res) => { 
    const newPromotion = req.body;
    try {
        await connectToMongo();
        const promotionCollection = getDB().collection(promotionModel);
 
        const result = await campaignCollection.insertOne(newCampaign); // Insert the new promotion
 
        if (result.insertedId) {
            return res.status(GLOBALS_ERRORS.HTTP_STATUS.OK).json({ success: true,
                message: `${newCampaign.c_nm} is added successfully`
            });
        } 
        else {
            return res.status(GLOBALS_ERRORS.HTTP_STATUS.BAD_REQUEST).json({ success: false,
                message: "Failed to add the promotion."
            });
        }
    } catch (error) {
        console.log("SNOWA_ERROR :: An error occurred while adding newCampaign: ", error.message);
        return res.status(GLOBALS_ERRORS.HTTP_STATUS.INTERNAL_SERVER_ERROR).json(GLOBALS_ERRORS.ERRORS.INTERNAL_SERVER_ERROR);
    }
};
 
module.exports = {
    getPromotions,
   addPromotion
}