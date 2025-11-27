import * as bodyParser from "body-parser";
import cors from 'cors';
import express from "express";
import { AppError } from "./common/utils/error";
import { globalErrorHandler } from "./middleware/error-handler";
import { RoleRoute, UserRoute } from "./modules";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// routes 
app.get("/",(req,res)=>res.json({message:"RBSC APIs"}));
app.use("/api/roles",RoleRoute)
app.use('/api/users',UserRoute)


app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);


export default app;