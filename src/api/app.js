import express, { request } from "express";
import "../../bootstrap.js";
import User from "../models/User.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import { ROUTE, ReqType, RouteType } from "../../constant.js";
import UserController from "../controller/UserController.js";
const app = express();

app.get("/", (req, res) => res.send("Hello world!"));
const userController = new UserController()

function appRoute({
  url,
  reqType,
  routeType,
  middleware = AuthMiddleware.verifyToken,
  callback = () => {},
}) {
  switch (routeType) {
    case RouteType.PUBLIC:
      app[reqType](url, (req, res) => callback(req, res));
      break;
    case RouteType.PRIVATE:
      app[reqType](url, middleware, (req, res) => callback(req, res));
      break;
    default:
      break;
  }
}

const testingApi = (req, res) => {
  console.log("req-->", req);
  return res.send(200);
};

appRoute({
  reqType: ReqType.GET,
  url: "/app/test",
  routeType: RouteType.PUBLIC,
  callback: testingApi,
});

// public routes

appRoute({
  reqType: ReqType.POST,
  url: ROUTE.REGISTER_USER,
  routeType: RouteType.PUBLIC,
  callback: userController.registerUser
})

appRoute({
  reqType: ReqType.GET,
  url: ROUTE.LOGIN,
  routeType: RouteType.PUBLIC,
  callback: userController.loginUser
})


async function createUser() {
  try {
    await User.create({
      email: "rishav@gmail.com",
      password: "Testing",
      firstName: "Rishav",
      lastName: "Mahajan",
    });
  } catch (error) {
    console.error(error);
  }
}

export default app;
