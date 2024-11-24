import { Request } from 'express';

export const RefreshCookieExtractor = (req: Request) => {
  const { refreshToken } = req.cookies;

  return refreshToken;
};
