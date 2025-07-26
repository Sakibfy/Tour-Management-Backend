/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request } from "express";
import httpStatues from "http-status-codes"
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { verifyToken } from "../../utils/utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";




const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const user = await UserServices.createUser(req.body)

//   res.status(httpStatues.CREATED).json({
//     message: "User Create Successfully",
//     user
  // })
  
  sendResponse(res, {
    success: true,
    statusCode: httpStatues.CREATED,
    message: "User Create Successfully",
    data: user
  })
})


const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
 
  const userId = req.body.id;
  // const token = req.headers.authorization
  // const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET) as JwtPayload

  const verifiedToken = req.user;
  
  const payload = req.body;

  const user = await UserServices.updateUser(userId, payload, verifiedToken as JwtPayload)


  sendResponse(res, {
    success: true,
    statusCode: httpStatues.CREATED,
    message: "User Updated Successfully",
    data: user
  })
})



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const result = await UserServices.getAllUsers();

  sendResponse(res, {
    success: true,
    statusCode: httpStatues.CREATED,
    message: "All Users Retrieved Successfully",
    data: result.data,
    meta: result.meta
  })
  
})

export const UserControllers = {
  createUser,
  getAllUsers,
  updateUser
}