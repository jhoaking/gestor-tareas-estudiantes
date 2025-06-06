import { QueryResult } from "pg";
import { connect } from "../db";



export class controlRolAuth {
  static getRol = async (rolName: string) => {
    try {
      const query = "SELECT rol_id FROM rol_tb WHERE rol = $1";
      const result: QueryResult<{ rol_id: number }> = await connect.query(
        query,
        [rolName]
      );

      if (result.rows.length === 0) {
        throw new Error("rol no encontrado");
      }

      return result.rows[0].rol_id;
    } catch (error: any) {
      throw new Error("Error al obtener el rol_id");
    }
  };
}