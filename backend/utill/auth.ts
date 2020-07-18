import { Request } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET_KEY } from '../config/constants';

export const checkJwt = (req: Request) => {
    let token = <string>req.headers.authorization || '';

    if (!token) {
        throw new Error('Authorization Token Required!')
    }
    token = token.split(' ')[1];
    try {
        const jwtPayload = <any>verify(token, JWT_SECRET_KEY);
        return jwtPayload;
    } catch (error) {
        throw error;
    }
};