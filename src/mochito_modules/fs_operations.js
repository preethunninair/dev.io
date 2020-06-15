var fs = require("fs-extra");

exports.buildProject = function (pages) {
  pages.forEach((page) => {
    fs.copy(
      "./template/components/page_template/template1.js",
      "./project/src/pages/mynewfile.js"
    )
      .then(() => {
        console.log("success!");
      })
      .catch((err) => {
        console.error(err);
      });
  });
};
// exports.createProject = function (appName, appDir) {
//   return fs
//     .copy("./project_template/", appDir + "\\" + appName)
//     .then(() => {
//       console.log("success!");
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// };
exports.initProjectConfig = function (appName) {
  return fs.writeFile(
    process.cwd() + "/current/devconfig.json",
    JSON.stringify({ appName: appName, appLogo: "logo.png" }),
    "utf-8"
  );
};
exports.copyFile = function (fromDir, toDir) {
  return fs
    .copy(fromDir, toDir)
    .then(() => {
      console.log("success!");
    })
    .catch((err) => {
      console.error(err);
    });
};
exports.initializeProject = function (appName) {
  return fs.ensureDir(appName, 0o2775);
};

exports.buildPagesDirectory = function () {
  return fs.ensureDir("./project/src/pages", 0o2775);
};
