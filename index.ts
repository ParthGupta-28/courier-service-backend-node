import type { Express, Request, Response } from "express";

const express = require("express");
const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/users", (req: Request, res: Response) => {});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
