var express = require("express");
var port = 8883;
var app = express();
var bodyParser = require("body-parser");

var mochitoBuild = require("./mochito_modules/fs_operations.js");
//var templateEngine = require("./mochito_modules/templateEngine.js");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/generateProject", (req, res) => {
  mochitoBuild.emptyDir(process.cwd() + "/publics/").then(function (response) {
    mochitoBuild
      .copyFolder(
        `${process.cwd()}/dev.io_engine/src`,
        process.cwd() + "/publics/"
      )
      .then(function (response) {
        mochitoBuild
          .applyProjectConfig(
            `${process.cwd()}/publics/dev.io/config.json`,
            req.body.config
          )
          .then(function (response) {
            mochitoBuild
              .applyProjectConfig(
                `${process.cwd()}/publics/dev.io/route.json`,
                req.body.route
              )
              .then(function (response) {
                res.send("200");
              });
          });
      });
  });
});

app.post("/build", (req, res) => {
  mochitoBuild.buildPagesDirectory().then(function (response) {
    console.log("folder created.");
    let pages = req.body.page;
    mochitoBuild.buildProject(pages);
  });

  res.send("Hello World!");
});

// app.post("/create", (req, res) => {
//   let appName = req.body.appName;
//   let appDir = req.body.appDir;
//   mochitoBuild
//     .createProjectDirectory(appName, appDir)
//     .then(function (response) {
//       mochitoBuild
//         .createProject(appName, appDir)
//         .then(function (response) {
//           templateEngine.generateIndexHTML(appDir, appName);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     });

//   res.send("Hello World!");
// });

app.listen(port, () =>
  console.log("Example app listening on port" + port + "!")
);
