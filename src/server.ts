import dotenv from "dotenv";
import app from "./app";
import { logger } from "./common/utils";
import { config, dbConnection } from "./config";
dotenv.config();

const connectApp=()=>{
    app.listen(config.port,()=>logger.info(`Node Express Application is started on : ${config.port}`))
}

(async()=>{
    await dbConnection();
    connectApp();
})()