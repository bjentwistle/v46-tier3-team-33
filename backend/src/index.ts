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
import jwtVerification from "./controllers/jwtVerification";
import productCreateController from "./controllers/productCreateController";
import productListController from "./controllers/productListController";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// declare a route with a response
app.get("/", (req, res) => {
  res.send("Server running");
});

app.post("/signup", emailCheck, passwordCheck, signup);

app.post("/login", loginController);

app.post("/logout", logoutController);

app.post("/product", jwtVerification, productCreateController);

app.get("/product", jwtVerification, productListController);

connect().then(() => {
  // start the server
  const PORT = process.env.BACK_PORT || 8081;
  app.listen(PORT, () => {
    console.log(`server running : http://localhost:${PORT}`);
  });
});
