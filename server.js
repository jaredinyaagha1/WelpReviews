const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./config/connection");
const path = require("path");
const hbs = exphbs.create({
  helpers: {
    section: function (name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    },
  },
});
const routes = require("./controllers");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Initializing a session store in mysql
const sess = {
  secret: "adsfljlk43j5lj24", // SET AS ENVIRONMENT VARIABLE LATER
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Having Express keep track of sessions with the session store
app.use(session(sess));

// Set Handlebars as the default template engine.
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// Starts the server to begin listening
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () =>
    console.log("Server listening on: http://localhost:" + PORT)
  );
});
