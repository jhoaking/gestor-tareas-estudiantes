export type Rol = "usuario" | "admin"; 

export interface AuthType{
    user_id : number,
    name : string,
    email : string,
    password : string,
    rol : Rol
}