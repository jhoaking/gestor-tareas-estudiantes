import z from "zod";

const taskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "debes proporcionar un titulo para tu tarea" }),
  description: z.string().optional(),
  fecha_entrega: z.string(),
  estado: z.enum(["completada", "terminada", "pendiente"]).default("pendiente"),
});

export type TaskType = z.infer<typeof taskSchema>;

export const validateTask = (input: unknown): TaskType => {
  const result = taskSchema.safeParse(input);
 
  if (!result.success) {
    console.error("❌ Error en validación Zod:", result.error);
    throw result.error;
  }

  return result.data;
};
   

