import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { NotFoundError, ValidationError } from "../errors/errors";

const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let errorMsg = err.message || "Something went wrong, Try again";

  if (err instanceof NotFoundError) {
    statusCode = StatusCodes.NOT_FOUND;
  } else if (err instanceof ValidationError) {
    statusCode = StatusCodes.BAD_REQUEST;
  }

  res.status(statusCode).json({ msg: errorMsg });
};

export { errorHandlerMiddleware };
