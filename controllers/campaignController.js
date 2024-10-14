const { GLOBALS_ERRORS} = require('../global/globals.js');
require("dotenv/config");
const {connectToMongo, getDB} = require("../services/dbService.js");

const getCampaigns = async(req, res)=>{
    res.status('OK').json();
}

const addNewCampaign = async (req, res) => {
    const newCampaign = req.body;

    try {
        // await connectToMongo();

        const campaignCollection = getDB().collection(process.env.CAMPAGIN);

        // Insert the new campaign
        newCampaign.status = 1;
        newCampaign.c_on = new Date();
        const result = await campaignCollection.insertOne(newCampaign);

        if (result.insertedId) {
            return res.status(GLOBALS_ERRORS.HTTP_STATUS.OK).json({ 
                success: true, 
                message: `${newCampaign.c_nm} is added successfully` 
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