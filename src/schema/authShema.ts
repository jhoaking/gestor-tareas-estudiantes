import z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  email: z
    .string()
    .min(1, { message: "El campo email es obligatorio" })
    .email({ message: "Revisa el formato del email" }),
  password: z
    .string()
    .min(4, { message: "La contraseña debe tener entre 4 y 12 caracteres" })
    .max(50, { message: "La contraseña debe tener entre 4 y 12 caracteres" }),
  rol: z.enum(["usuario", "admin"]).optional().default("usuario"),
});

export type registerUserType = z.infer<typeof registerSchema>;

const LoginSchema = z.object({
  email: z.string().email("Email no válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginType = z.infer<typeof LoginSchema>;

export const validateLogin = (input: unknown): LoginType => {
  return LoginSchema.parse(input);
};


export const validateRegister = (input: unknown): registerUserType => {
  const result = registerSchema.safeParse(input);


  if (!result.success) {
     console.error("❌ Error en validación Zod:", result.error);
    throw result.error;
  }

  return result.data;
};