import { gql } from "apollo-server-express";

export const typeDefs = gql`
  enum Estado {
    COMPLETADA
    TERMINADA
    PENDIENTE
  }
  enum Rol {
    ADMIN
    USUARIO
  }

  type User {
    user_id: ID!
    name: String!
    email: String!
    password: String!
    rol: Rol!
  }

  type Task {
    task_id: ID!
    title: String
    description: String
    fecha_entrega: String
    estado: Estado
    user: User
  }

  input CreateTask {
    title : String!
    descrition:
    fecha_entrega : String
    estado : Estado
  }

  input Register{
    name : String!
    email : String!
    password : String!,
    rol : Rol
  }
   input Login {
     email: String!
    password: String!
  }
    input AuthPayload {
        token : String!,
        user : User!
    }

    type Query {
        getAllTask : [Task]
        getTaskById(task_id : ID!) :Task
        getAllUser : User
        getUseByRol(rol : Rol!):User
    }

    type Mutation {
      register(input:Register):AuthPayload
      login(input:Login):AuthPayload

      createTask(input:CreateTask):Task
      updateTask(task_id : ID! , input:CreateTask):Task
      deleteTask(task_id : ID!):String
    }
`;
