var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

url = 'http://www.clickondetroit.com/';
request(url, function(error, response, html){
  if(!error){
    var articles = [];
    var $ = cheerio.load(html);
    $(".article-wrap").each(function(i,element){
      //gets the article headers on the main page and cleans them
      var title = $(this).children().children(".article-headline").text();
      title = title.replace(/\s+/g, " ")
       .replace(/[^a-zA-Z ]/g, "")
       .toLowerCase();
      //gets the url's for each of the articles
      var url = $(this).find("a").attr("href")
      //make an object containing the title and url for each article
      var article = {"title":title, "url": url}
      articles.push(article)
    })
    //log the articles to the console
    console.log(articles)
  }
})


app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;
