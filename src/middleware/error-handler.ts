import { NextFunction, Request, Response } from "express";
import { logger } from "../common/utils";

const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode ?? 500).json({
    status: err.status ?? "error",
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err: any, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    return;
  }

  logger.error("UNEXPECTED ERROR", err);
  res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
};

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode ?? 500;
  err.status = err.status ?? "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    sendErrorProd(err, res);
  }
};