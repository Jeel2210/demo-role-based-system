import mongoose from "mongoose";
import { logger } from "../common/utils/logger";
import { config } from "../config/config";

export const dbConnection =async () => {
  try {
   const dbConnectionUrl=config.mongoDbURL;
   logger.info(`Mongo Db Connection initiated`,dbConnectionUrl);
   if(!dbConnectionUrl) throw new Error(`[Error]:URL not found.`);

   await mongoose.connect(`${dbConnectionUrl}`);
   
   logger.info(`Mongo Db Connected`,dbConnectionUrl);
   } catch (error) {
   logger.error(error);
  }
};
