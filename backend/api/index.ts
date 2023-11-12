import express from "express";
import dotenv from "dotenv";
import connect from "./mongoconfig";
import cookieParser from "cookie-parser";
import {
  signup,
  emailCheck,
  passwordCheck,
} from "./controllers/signupController";
import loginController from "./controllers/loginController";
import logoutController from "./controllers/logoutController";
import getUserContextController from "./controllers/getUserContextController";

import jwtVerification from "./controllers/jwtVerification";
import productCreateController from "./controllers/productCreateController";
import productListController from "./controllers/productListController";

import cors from "cors"; // Import the cors middleware
import upload from "./multerSetup";
import multer from "multer";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [""],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

// declare a route with a response
app.get("/", (req, res) => {
  res.send("Server running");
});

app.get("/user", jwtVerification, getUserContextController);

app.post("/signup", emailCheck, passwordCheck, signup);

app.post("/login", loginController);

app.post("/logout", logoutController);

app.post(
  "/product",
  jwtVerification,
  upload.single("picture"),
  productCreateController
);

app.get("/product", jwtVerification, productListController);

app.listen(8081, () => {
  console.log(`server running`);
});

module.exports = app;
