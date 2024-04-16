import type { Express, Request, Response } from "express";
import { CreateUser, FindUser, LoginUser, UpdateUser } from "./service/user";
import { CreateOrder, FindByOrderId, GetAllOrders } from "./service/order";

const express = require("express");
const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  console.log(req.query);
  res.send("Hello World!");
});

app.post("/users", async (req: Request, res: Response) => {
  const user = await CreateUser(req.body).catch((err) => {
    res.status(400).send(err.message);
  });
  if (user) {
    res.send(user);
  }
});

app.post("/users/{email}/order", async (req: Request, res: Response) => {
  const email = req.params.email;
  const user = await FindUser(email).catch((err) => {
    res.status(400).send(err.message);
  });

  if (!user) {
    return;
  }

  const order = await CreateOrder(req.body).catch((err) => {
    res.status(400).send(err.message);
  });

  if (order) {
    res.send(order);
  }
});

app.get("/users/{email}/orders", async (req: Request, res: Response) => {
  const email = req.params.email;
  const user = await FindUser(email).catch((err) => {
    res.status(400).send(err.message);
  });

  if (!user) {
    return;
  }

  const orders = await GetAllOrders(email).catch((err) => {
    res.status(400).send(err.message);
  });

  if (orders) {
    res.send(orders);
  }
});

app.post("/login", async (req: Request, res: Response) => {
  const user = await LoginUser(req.body).catch((err) => {
    res.status(400).send(err.message);
  });

  if (user) {
    res.send(user);
  }
});

app.get("users/{orderId}", async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  const order = await FindByOrderId(orderId).catch((err) => {
    res.status(400).send(err.message);
  });
  if (!order) {
    return;
  }
  res.send(order);
});

app.put(
  "/users/update/{email}/{password}",
  async (req: Request, res: Response) => {
    const email = req.params.email;
    const password = req.params.password;
    const user = await UpdateUser({ ...req.body, password }).catch((err) => {
      res.status(400).send(err.message);
    });

    if (!user) {
      return;
    }
    res.send(user);
  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
