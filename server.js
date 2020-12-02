const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const UserModel = require("./models/user");

mongoose.connect(
  `mongodb+srv://abdallah:${process.env.MONGOdB_PASS}@zamarket.hmucz.mongodb.net/Shopping?retryWrites=true&w=majority/`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  () => {
    console.log("connected");
  }
);

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
app
  .prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());
    server.use(cookieParser());

    server.get("/authentication", (req, res) => {
      const token = req.cookies.jwt;
      if (!token) return res.end("noToken");
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.end("invalid");
        const user = await UserModel.findById(decoded.id).exec();
        return res.end(
          JSON.stringify({
            name: user.name,
            amount: user.amount,
            number: user.number,
            mail: user.mail,
            birth: user.birth,
            roles: user.roles
          })
        );
      });
    });

    server.use(authRoutes);
    server.use(productRoutes);

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
