var express = require('express');
var app = express();
var PORT = process.env.PORT || 8090;

app.use("/js", express.static("public/js"));
app.use("/css", express.static("public/css"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/newPortfolio.html");
});

app.get("/blog", function(req, res) {
  res.sendFile(process.cwd() + "/bsBlog.html");
});

app.get("/projects", function(req, res) {
  res.sendFile(process.cwd() + "/bsProjects.html");
});
app.get("/contact", function(req, res) {
  res.sendFile(process.cwd() + "/contact.html");
});
app.get("/clicky", function(req, res) {
  res.sendFile(process.cwd() + "/hwWeek3/home.html");
});
app.get("/rps", function(req, res) {
  res.sendFile(process.cwd() + "/rps/home.html");
});


app.listen(PORT, function() {
  console.log("Listening on port %s", PORT);
});
