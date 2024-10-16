const { GLOBALS_ERRORS} = require('../global/globals.js');
const {connectToMongo, getDB} = require("../services/dbService.js");
require("dotenv/config");

/**
 * Get collection names
*/ 
const promotionModel = process.env.PROMOTION_MODEL;
const campaignModel = process.env.CAMPAIGN_MODEL;
/***
 * This function will fetch allCampaigns
 */
const getPromotions = async(req, res) => {
    const requestParams = req.query;
 
    try {
        //connect to database
        await connectToMongo();
        // get collection name from env file
        const promotionCollection = getDB().collection(promotionModel);
       
        // Default values for pageNumber and pageCount if they are not provided
        const pageNumber = parseInt(requestParams.pageNumber) || 1; // default to 1st page
        const pageCount = parseInt(requestParams.pageCount) || 5;   // default to 5 records per page
 
        // Calculate the number of records to skip based on the current page
        const skip = (pageNumber - 1) * pageCount;
        const limit = pageCount;
 
        // To get the totalCampaigns count
        let totalPromotions;
        let result;

        // Determine the query filter based on c_id
        const queryFilter = requestParams.c_id === "all" ? {} : { c_id: requestParams.c_id };

        // Count documents based on the filter
        totalPromotions = await promotionCollection.countDocuments(queryFilter);

        // Fetch the campaigns with the specified filter, pagination, and sorting
        result = await promotionCollection.find(queryFilter).skip(skip).limit(limit).sort({ c_on: -1 }).toArray();
        
        return res.status(GLOBALS_ERRORS.HTTP_STATUS.OK).json({promotions: result, totalCount: totalPromotions});
       
    } catch (error) {
        console.log("SNOWA_ERROR :: An error occurred while fetching allCampaigns: ", error.message);
        return res.status(GLOBALS_ERRORS.HTTP_STATUS.INTERNAL_SERVER_ERROR).json(GLOBALS_ERRORS.ERRORS.INTERNAL_SERVER_ERROR);
    }
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
    newPromotion.status = 1;
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

const getCampaignNames = async (req, res) => {
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
                $project : { _id : 0, c_nm : 1, c_id : 1, start_dt : 1, end_dt : 1 }
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
   getCampaignNames
}