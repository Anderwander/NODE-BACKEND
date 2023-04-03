import express from "express";
import routerAPI from "./routes/api/router.js";
import routerView from "./routes/view/router.js";
import express_session from "express-session";
import passport from "./config/passport.js";

const app = express();

app.use(express.static("public"));
app.use(
  express_session({
    secret: "limon",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");

app.use("/api/", routerAPI);
app.use("/", routerView);

app.listen(3000, () => {
  console.log("Server is runing on port 3000");
});
