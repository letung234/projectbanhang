const express = require('express')
const methodOverride = require("method-override");
require("dotenv").config()
const app = express()
const port = process.env.PORT
const database =require("./config/database")
const route =require("./routes/index.route")
const routeAdmin=require("./routes/admin/index.route")
const systemConfig =require("./config/system")
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const moment = require("moment");
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"))
app.locals.prefixAdmin =systemConfig.prefixAdmin
app.locals.moment = moment;
app.use(cookieParser("LHNASDASDAD"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

app.set('views', './views')
app.set('view engine', 'pug')






app.use(express.static("public"))
database.connect()
route(app)
routeAdmin(app)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})