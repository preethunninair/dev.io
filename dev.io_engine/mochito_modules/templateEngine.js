const Handlebars = require('handlebars');
var fs = require("fs-extra");
exports.generateIndexHTML=function(appDir,appName){
  const source = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet">
    <title>{{title}}</title>
  </head>
  <body class="skin-blue sidebar-mini sidebar-collapse">
    <section id="app" class="h-100"></section>
  </body>
  </html>
`;
const template = Handlebars.compile(source);
const contents = template({title: appName});

fs.outputFile(appDir+"\\"+appName+"\\src\\index.html", contents, err => {
    if (err) {
        return console.error(`Autsch! Failed to store template: ${err.message}.`);
    }


});
}
