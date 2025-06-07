import { registerUserType } from "schema/authShema";
import { connect } from "../db";
import { controlRolAuth } from "./controlRol";
import { utilAuth } from "utils/authUtil";
import { AuthType } from "types/auth";

export class authClass {
  register = async (
    data: registerUserType,
    isAdmin: boolean
  ): Promise<AuthType> => {
    try {
      const nombreRol = isAdmin ? data.rol : "usuario";

      const rol = await controlRolAuth.getRol(nombreRol);

      const password = await utilAuth.hashPassword(data.password);

      const query = `
      INSERT INTO user_tb(name, email, password, rol_id)
      VALUES($1, $2, $3, $4)
      RETURNING *;;
    `;

      const values = [data.name, data.email, password, rol];
      const result = await connect.query(query, values);
      const user = result.rows[0];

      const rolResult = await connect.query(
        "SELECT rol FROM rol_tb WHERE rol_id = $1",
        [user.rol_id]
      );

      const rolNombre = rolResult.rows[0]?.rol;

      return {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        password: user.password,
        rol: rolNombre,
      };
    } catch (error: any) {
      console.error(error);
      throw new Error("Error en el registro");
    }
  };

  verifyEmail = async (email: string): Promise<AuthType | null> => {
    const query = "SELECT * FROM user_tb WHERE email = $1";
    const result = await connect.query(query, [email]);
    return result.rows[0] || null;
  };
}
