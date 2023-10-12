const express = require("express");
const httpErrors = require("http-errors");
const User = require("./mongoose/userSchema");
const Product = require("./mongoose/productSchema");
const mongoose = require("./mongoose");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Adding mongoose and schemas to headers
app.use((req, res, next) => {
    req.headers.mongoose = mongoose;
    req.headers.user = User;
    req.headers.product = Product;
    next();
});

app.get("/hello", (req, res, next) => {
    res.json({ message: `User CRUD hello world ${process.env.NODE_ENV}` });
});

app.use("/user/", userRouter);
app.use("/product/", productRouter);

app.use((req, res, next) => {
    next(httpErrors(404));
});

module.exports = app;
