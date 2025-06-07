import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "graphql/typeDef";
import { resolvers } from "graphql/resolvers";
import { PORT, SECRET_JWT_KEY } from "config";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { AuthType } from "types/auth";

async function start() {
  const app = express();

  app.use(cookieParser()); 
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const token = req.cookies?.access_token;
        let user;
        if (token) {
          try {
            user = jwt.verify(token, SECRET_JWT_KEY) as AuthType;
          } catch {}
        }
        return { user, res };
      },
    })
  );

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}/graphql`);
  });
}

start();
