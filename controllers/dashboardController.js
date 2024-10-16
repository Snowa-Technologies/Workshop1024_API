const { GLOBALS_ERRORS} = require('../global/globals.js');
require("dotenv/config");
const {connectToMongo, getDB} = require("../services/dbService.js");

/**
 * Get collection names
*/ 
const promotionModel = process.env.PROMOTION_MODEL;
const campaignModel = process.env.CAMPAIGN_MODEL;

/**
 * Get dashboard statistics
 */
const getCampaignStatistics = async (req, res) => {
    try{
        await connectToMongo();
        const promotionCollection = getDB().collection(promotionModel);
        const campaignCollection = getDB().collection(campaignModel);

        const totalCampaigns = await campaignCollection.countDocuments();
        const totalPromotions = await promotionCollection.countDocuments();

        const pipeline = [
            {
                $group: {
                    _id: null, // Grouping by null to get a single result
                    totalImpressions: { $sum: "$impr" } ,
                    totalClicks : { $sum: "$click" }
                }
            }
        ];

        const chartPipeline = [
            {
                $group: {
                    _id: "$c_id",
                    c_nm: { $first: "$c_nm" },
                    totalImpressions: { $sum: "$impr" },
                    totalClicks : {$sum : "$click"}
                }
            },
            {
                $project: {
                    name: "$c_nm",
                    totalImpressions: 1,
                    totalClicks : 1,
                    _id: 0
                }
            }
        ];

        const result = await promotionCollection.aggregate(pipeline).toArray();
        const chartResult = await promotionCollection.aggregate(chartPipeline).toArray();
        const chartData = { chartImpr : [], chartClicks : [], labels : []};

        for(const item of chartResult) {
            chartData.chartImpr.push(item.totalImpressions);
            chartData.chartClicks.push(item.totalClicks);
            chartData.labels.push(item.name);
        }

        const totalImpressions = result[0].totalImpressions;
        const totalClicks = result[0].totalClicks

        const statisticsData = {totalCampaigns, totalPromotions, totalImpressions, totalClicks, chartData};
        return res.status(GLOBALS_ERRORS.HTTP_STATUS.OK).json(statisticsData);
    }
    catch(error) {
        console.log("SNOWA_ERROR :: An error occurred while fetching dashboard statistics ", error.message);
        return res.status(GLOBALS_ERRORS.HTTP_STATUS.INTERNAL_SERVER_ERROR).json(GLOBALS_ERRORS.ERRORS.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    getCampaignStatistics
}