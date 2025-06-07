import { AuthType } from "types/authTypes";

export {};

declare global {
  namespace Express {
    interface Request {
      user?: AuthType;
    }
  }
}