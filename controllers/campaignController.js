const { GLOBALS_ERRORS} = require('../global/globals.js');
require("dotenv/config");
const shortid = require('shortid');
const {connectToMongo, getDB} = require("../services/dbService.js");

const getCampaigns = async(req, res) => {
    console.log("ok")
}

const addNewCampaign = async (req, res) => {
    const newCampaign = req.body;

    try {
        await connectToMongo();

        const campaignCollection = getDB().collection(process.env.CAMPAGIN);

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