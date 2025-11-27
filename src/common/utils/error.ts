export class AppError extends Error {
  public statusCode: number;
  public status: "fail" | "error";
  public isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${String(statusCode).startsWith("4") ? "fail" : "error"}` as "fail" | "error";
    this.isOperational = isOperational;

    // maintain proper stack trace (only on V8)
    Error.captureStackTrace?.(this, this.constructor);
  }
}