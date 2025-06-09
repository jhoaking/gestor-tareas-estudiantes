import { TaskTypes } from "types/task";
import { connect } from "../db";
import { TaskType } from "schema/taskSchema";
import { controlTask } from "./cambioIdNombreUser";

export class taskClass {
  static getAllTask = async (): Promise<TaskTypes[]> => {
    const query = `SELECT * FROM task_tb`;
    const result = await connect.query(query);
    return result.rows;
  };

  static getTaskId = async (task_id: number): Promise<TaskTypes> => {
    const query = `SELECT * FROM task_tb WHERE task_id = $1`;
    const result = await connect.query(query, [task_id]);
    return result.rows[0];
  };

  static createTask = async (data: TaskType & { user: string }) => {
    const estado_id = await controlTask.getEstado(data.estado);

    const query = `
    INSERT INTO task_tb(title, description, fecha_entrega, estado_id, user_id)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *;
  `;

    const values = [
      data.title,
      data.description,
      data.fecha_entrega,
      estado_id,
      data.user, 
    ];

    const result = await connect.query(query, values);
    return result.rows[0];
  };
  static updateTask = async (
    data: TaskType,
    task_id: number
  ): Promise<TaskTypes | null> => {
    const estado_id = await controlTask.getEstado(data.estado);
    const query = `UPDATE task_tb SET title = $1 , description = $2 , fecha_entrega = $3 , estado_id = $4 WHERE task_id = $5 RETURNING *;`;
    const values = [
      data.title,
      data.description,
      data.fecha_entrega,
      estado_id,
      task_id,
    ];
    const result = await connect.query(query, values);
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  };

  static deleteTask = async (
    task_id: number
  ): Promise<{ message: string } | null> => {
    const query = `DELETE FROM task_tb WHERE task_id = $1`;
    const resutl = await connect.query(query, [task_id]);
    if (resutl.rowCount === 0) {
      return null;
    }
    return { message: "se elmino con exito la tarea" };
  };
}
