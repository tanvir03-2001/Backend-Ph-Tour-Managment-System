import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // throw new Error("Error Class error");
    // throw new AppError(httpStatus.BAD_REQUEST, "Fake Error");

    const user = await UserService.createUser(req.body);

    res.status(httpStatus.CREATED).json({
      message: "User Created Successfully",
      user,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log(error);
    next(error);
  }
};

export const UserController = {
  createUser,
};
