var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

url = 'http://www.clickondetroit.com/';
request(url, function(error, response, html){
  if(!error){
    var titles = [];
    var $ = cheerio.load(html);
    $(".article-wrap").each(function(i,element){
      //gets the article headers on the main page
      var title = $(this).children().children(".article-headline").text();
      var url = $(this).find("a").attr("href")
      titles.push(title)
      var object = {"title":title, "url": url}
      //console.log(object);
    })
    console.log(titles)
  }
})


app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;
