const { GLOBALS_ERRORS} = require('../global/globals.js');
const {connectToMongo, getDB} = require("../services/dbService.js");
require("dotenv/config");

/**
 * Get collection names
*/ 
const promotionModel = process.env.PROMOTION_MODEL;
const campaignModel = process.env.CAMPAIGN_MODEL;
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
    newPromotion.c_on = new Date();
    newPromotion.start_dt = new Date(newPromotion.start_dt);
    newPromotion.end_dt = new Date(newPromotion.end_dt);
    newPromotion.u_on = new Date();
    newPromotion.click = 100;
    newPromotion.impr = 1000;
    try {
        await connectToMongo();
        const promotionCollection = getDB().collection(promotionModel);
 
        const result = await promotionCollection.insertOne(newPromotion); // Insert the new promotion
 
        if (result.insertedId) {
            return res.status(GLOBALS_ERRORS.HTTP_STATUS.OK).json({ success: true,
                message: `${newPromotion.p_nm} is added successfully`
            });
        } 
        else {
            return res.status(GLOBALS_ERRORS.HTTP_STATUS.BAD_REQUEST).json({ success: false,
                message: "Failed to add the promotion."
            });
        }
    } catch (error) {
        console.log("SNOWA_ERROR :: An error occurred while adding newPromotion: ", error.message);
        return res.status(GLOBALS_ERRORS.HTTP_STATUS.INTERNAL_SERVER_ERROR).json(GLOBALS_ERRORS.ERRORS.INTERNAL_SERVER_ERROR);
    }
};

const getCampaigns = async (req, res) => {
    try {
        await connectToMongo();
        const campaignCollection = getDB().collection(campaignModel);

        const today = new Date();

        const pipeline = [
            {
                // Match documents where today is between start_dt and the end of the end_dt
                $match: {
                    start_dt: { $lte: today },
                    end_dt: { $gte: today }
                }
            },
            {
                $project : {
                    _id : 0,
                   c_nm : 1,
                   c_id : 1
                }
            }
        ];
 
        const result = await campaignCollection.aggregate(pipeline).toArray();
        return res.status(GLOBALS_ERRORS.HTTP_STATUS.OK).json(result);
               
    } catch (error) {
        console.log("SNOWA_ERROR :: An error occurred while fetching campaigns ", error.message);
        return res.status(GLOBALS_ERRORS.HTTP_STATUS.INTERNAL_SERVER_ERROR).json(GLOBALS_ERRORS.ERRORS.INTERNAL_SERVER_ERROR);
    }
} 
 
module.exports = {
    getPromotions,
   addPromotion,
   getCampaigns
}