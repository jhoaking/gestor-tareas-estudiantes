import { authService } from "service/authService";
import { validateRegister, validateLogin } from "schema/authShema";
import { authClass } from "../model/authModel";
import { taskClass } from "model/taskModel";
import { CookieOptions } from "express";
import { validateTask } from "schema/taskSchema";

const auth = new authService(new authClass());

export const resolvers = {
  Mutation: {
    register: async (_root: any, args: any) => {
      const vali = validateRegister(args.input);
      const isAdmin = !!vali.rol;
      try {
        const user = await auth.register(vali, isAdmin);
        return user;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    login: async (_root: any, args: any, context: any) => {
      const { res } = context;
      const vali = validateLogin(args.input);
      const token = await auth.login(vali.email, vali.password);
      const options: CookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      };
      res.cookie("access_token", token, options);
      return {
        token,
      };
    },
    logout: async (_root: any, _args: any, context: any) => {
      const { res } = context;

      res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      return "Sesión cerrada exitosamente.";
    },

 
