const { GLOBALS_ERRORS} = require('../global/globals.js');
require("dotenv/config");
const shortid = require('shortid');
const {connectToMongo, getDB} = require("../services/dbService.js");
/***
 * This function will fetch allCampaigns
 */
const getCampaigns = async(req, res) => {
    const requestParams = req.query;

    try {
        //connect to database
        await connectToMongo();
        // get collection name from env file
        const campaignCollection = getDB().collection(process.env.CAMPAIGN_MODEL);
        
        // Default values for pageNumber and pageCount if they are not provided
        const pageNumber = parseInt(requestParams.pageNumber) || 1; // default to 1st page
        const pageCount = parseInt(requestParams.pageCount) || 5;   // default to 5 records per page

        // Calculate the number of records to skip based on the current page
        const skip = (pageNumber - 1) * pageCount;
        const limit = pageCount;

        // To get the totalCampaigns count 
        const totalCampaigns = await campaignCollection.countDocuments();

        const result = await campaignCollection.find().skip(skip).limit(limit).sort({ c_on: -1 }).toArray();
        return res.status(GLOBALS_ERRORS.HTTP_STATUS.OK).json({campaigns: result, totalCount: totalCampaigns});
        
    } catch (error) {
        console.log("SNOWA_ERROR :: An error occurred while fetching allCampaigns: ", error.message);
        return res.status(GLOBALS_ERRORS.HTTP_STATUS.INTERNAL_SERVER_ERROR).json(GLOBALS_ERRORS.ERRORS.INTERNAL_SERVER_ERROR);
    }
}
/***
 * This function will addNewCampaign
 */
const addNewCampaign = async (req, res) => {
    const newCampaign = req.body;

    try {
        //connect to database
        await connectToMongo();
        // get collection name from env file
        const campaignCollection = getDB().collection(process.env.CAMPAIGN_MODEL);

        let sid = shortid.generate();
        if (sid.length > 7) {
            sid = sid.substring(0, 7); 
            newCampaign.c_id = sid;
        }

        newCampaign.status = 1;
        newCampaign.start_dt = new Date(newCampaign.start_dt);
        newCampaign.end_dt = new Date(newCampaign.end_dt);
        newCampaign.c_on = new Date();
        newCampaign.u_on = new Date();

        const result = await campaignCollection.insertOne(newCampaign);

        if (result.insertedId) {
            return res.status(GLOBALS_ERRORS.HTTP_STATUS.OK).json({ 
                success: true, 
                message: "Campaign is added successfully "
            });
        } else {
            return res.status(GLOBALS_ERRORS.HTTP_STATUS.BAD_REQUEST).json({ 
                success: false, 
                message: "Failed to add the campaign." 
            });
        }

    } catch (error) {
        console.log("SNOWA_ERROR :: An error occurred while adding newCampaign: ", error.message);
        return res.status(GLOBALS_ERRORS.HTTP_STATUS.INTERNAL_SERVER_ERROR).json(GLOBALS_ERRORS.ERRORS.INTERNAL_SERVER_ERROR);
    }
};

module.exports = {
   getCampaigns,
   addNewCampaign
}