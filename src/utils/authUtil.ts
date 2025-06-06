import { SALT_ROUNDS,SECRET_JWT_KEY } from "config";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

export class utilAuth {
  static hashPassword = async (password: string) => {
    const hash = await bcrypt.hash(password, Number(SALT_ROUNDS));
    return hash;
  };

  static comparePassword = async (password: string, hashPassword: string) => {
    const compare = await bcrypt.compare(password, hashPassword);
    return compare;
  };

  static createToken = (user: JwtPayload): string => {
    const token = jwt.sign(
      {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        rol: user.rol
      },
      SECRET_JWT_KEY,
      { expiresIn: "24h" }
    );
    return token;
  };
}