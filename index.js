var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var url = 'http://www.clickondetroit.com';
var articles = [];
request(url, function(error, response, html){
  if(!error){
    var $ = cheerio.load(html);
    $(".article-wrap").each(function(i,element){
      //gets the article headers on the main page and cleans them
      var title = $(this).children().children(".article-headline").text();
      title = title.trim();
      //gets the url's for each of the articles
      var url = $(this).find("a").attr("href")
      //make an object containing the title and url for each article
      var article = {"title":title, "url": url}
      articles.push(article)
    })
    //log the articles to the console
    //This is to grab the content for each article i'm sure i'm doing it wrong
    for(var i=0;i<articles.length;i++){
      var url =  'http://www.clickondetroit.com' + articles[i].url
      request(url,function(error,response,html){
        if(!error){
          var $ = cheerio.load(html);
          $(".story_content").each(function(i,element){

          })
          
          console.log(articles);

        }
      })
    }
  }
})

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;
