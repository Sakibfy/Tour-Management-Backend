import { Response } from "express";

export  interface AuthTokens {
  accessToken?: string;
  refreshToken ?: string;
}

export const setAuthCookeie = (res: Response, tokeninfo: AuthTokens) => {

  if (tokeninfo.accessToken) {
    res.cookie('accessToken', tokeninfo.accessToken, {
      httpOnly: true,
      secure: false
  })
  }

  if (tokeninfo.refreshToken) {

    res.cookie('refreshToken', tokeninfo.refreshToken, {
      httpOnly: true,
      secure: false
  })
  }
}