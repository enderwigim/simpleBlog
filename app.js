// Required modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


/* Global Variables */
let posts = [];

// Get and Post Routes
app.get("/", function(req, res) {
  res.render("home", {posts: posts});
});

app.get("/about", function(req, res) {
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res) {
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.get("/posts/:postName", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post) {
    const storeTitle = _.lowerCase(post.postTitle);

    if (storeTitle === requestedTitle){
      res.render("post", {
        title: post.postTitle,
        body: post.postBody,
      });
    }
  });
});

app.post("/compose", function(req, res) {
  const newPost = {
    postTitle: req.body.postTitle,
    postBody: req.body.postBody
  };
  posts.push(newPost);
  res.redirect("/");

  });


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
