/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status-codes"
import { sendResponse } from "../../utils/sendResponse"
import { AuthServices } from "./auth.service"
import { catchAsync } from "../../utils/utils/catchAsync"
import AppError from "../../errorHelpers/AppError"
import { setAuthCookeie } from "../../utils/utils/setCookie"
import { JwtPayload } from "jsonwebtoken"

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const loginInfo = await AuthServices.credentialsLogin(req.body)

    // res.cookie('accessToken', loginInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })

    // res.cookie('refreshToken', loginInfo.refreshToken, {
    //     httpOnly: true,
    //     secure: false
    // })
    
    setAuthCookeie(res, loginInfo)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged In Successfully",
        data: loginInfo,
    })
})



const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
        throw new  AppError(httpStatus.BAD_REQUEST, "No refresh recieved from cookies")
    }
    const toeknInfo = await AuthServices.getNewAccessToken(refreshToken as string)


    // res.cookie('accessToken', toeknInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })

    setAuthCookeie(res, toeknInfo)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "New Aeccess Token Retrived Successfully",
        data: toeknInfo,
    })
})


const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    res.clearCookie("accessToekn", {
        httpOnly: true,
        secure: true,
        sameSite:"lax"
    })
    res.clearCookie("refreshToekn", {
        httpOnly: true,
        secure: true,
        sameSite:"lax"
    })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged Out Successfully",
        data: null,
    })
})

const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user;
    
    await AuthServices.resetPassword(oldPassword, newPassword,  decodedToken as JwtPayload)


    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Password Changed Successfully",
        data: null,
    })
})

export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken,
    logout,
    resetPassword
}