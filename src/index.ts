import express from 'express';
// import { ApolloServer } from 'apollo-server-express';
import { PORT } from 'config';


export const app: express.Application = express();

// async function start() {
//   const apolloServer = new ApolloServer({
//     // typeDefs,
//     // resolvers,
//   });
// //   await apolloServer.start();
// //   apolloServer.applyMiddleware({ app });
  

app.listen(PORT, () => {
    console.log(
        `🚀 Servidor corriendo en http://localhost:PORT`
    );
});
  
// }


// start();