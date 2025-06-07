import { authClass } from "model/authModel";
import { JwtPayload } from "jsonwebtoken";
import { utilAuth } from "utils/authUtil";
import { RegisterType } from "types/auth";

export class authService {
  constructor(private model: authClass) {}

  async register(data: RegisterType, isAdmin: boolean) {
    const foundEmail = await this.model.verifyEmail(data.email);
    if (foundEmail) {
      throw new Error("este email ya fue registrado");
    }
    const user = await this.model.register(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        rol: data.rol,
      },
      isAdmin
    );
    return user;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.model.verifyEmail(email);
    if (!user) {
      throw new Error("email no encontrado");
    }
    const passwordValid = await utilAuth.comparePassword(
      password,
      user.password
    );
    if (!passwordValid) {
      throw new Error("contraseña incorrecta");
    }

    const payload: JwtPayload = {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      rol: user.rol,
    };
    const token = utilAuth.createToken(payload);
    return token;
  }
}
