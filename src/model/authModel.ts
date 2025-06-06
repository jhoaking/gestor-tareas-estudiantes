import { registerUserType } from "schema/authShema";
import { connect } from "../db";
import { controlRolAuth } from "./controlRol";
import { utilAuth } from "utils/authUtil";
import { QueryResult } from "pg";
import { AuthType } from "types/auth";

export class authModel {
  static register = async (
    data: registerUserType,
    isAdmin: boolean
  ): Promise<AuthType> => {
    try {
      const nombreRol = isAdmin ? data.rol : "usuario";

      const rol = await controlRolAuth.getRol(nombreRol);

      const query = `INSERT INTO user_tb(name,email,password,rol_id) VALUES($1,$2,$3,$4) RETURNING*;`;

      const password = await utilAuth.hashPassword(data.password);

      const values = [data.name, data.email, password, rol];

      const result: QueryResult<AuthType> = await connect.query(query, values);

      return result.rows[0];
    } catch (error: any) {
      console.error(error);
      throw new Error("Error en el registro");
    }
  };

  static verifyEmail = async (email: string): Promise<AuthType | null> => {
    const query = "SELECT * FROM user_tb WHERE email = $1";
    const result = await connect.query(query, [email]);
    return result.rows[0] || null;
  };
}
