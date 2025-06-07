import { Request,Response,NextFunction } from "express";
import { SECRET_JWT_KEY } from "config";
import jwt from "jsonwebtoken";
import { AuthType } from "types/auth";

interface AutenticateRequest extends Request {
  user?: AuthType;
}

export const verifyToken = (
  req: AutenticateRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      res
        .status(401)
        .json({ message: "no autorizado : token no proporcionado" });
    }

    const decoded = jwt.verify(token, SECRET_JWT_KEY) as AuthType;
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};
