import express from "express";
import path from "node:path";
import db from "./config/connection.js";
import routes from "./routes/index.js";
import { ApolloServer } from "apollo-server-express"; // Import ApolloServer
import { typeDefs, resolvers } from "./graphql/schema.js"; // Import your typeDefs and resolvers

const app = express();
const PORT = process.env.PORT || 3001;

// Create a new instance of Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Add Apollo middleware to the Express server
server.applyMiddleware({ app });

// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
  });
}

app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
