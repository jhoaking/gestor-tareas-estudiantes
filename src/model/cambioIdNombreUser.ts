import { QueryResult } from "pg";
import { connect } from "../db";

export class controlTask {
  static getEstado = async (estado: string) => {
    try {
      const query = "SELECT estado_id FROM estado_tb WHERE estado = $1";
      const result: QueryResult<{ estado_id: number }> = await connect.query(
        query,
        [estado]
      );

      if (result.rows.length === 0) {
        throw new Error("estado no encontrado");
      }

      return result.rows[0].estado_id;
    } catch (error: any) {
      throw new Error("Error al obtener el estado_id");
    }
  };
}
