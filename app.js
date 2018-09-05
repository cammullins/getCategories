const express = require('express');
const fs      = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const path    = require('path');
const csv     = require('csvtojson');
const csvFilePath = './articles.csv';
require('dotenv').config();

const app     = express();

const PORT    = process.env.PORT || 8080;

var sites;
    // .then(() => console.log(sites))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './getCategories.html'))
})

app.get('/scrape', (req, res) => {
    sites.forEach( site => {
        console.log(site.URL)
        request(site.URL, function(error, response, html){
            if (!error) {
                const $ = cheerio.load(html);
                if($('.breadcrumbs').length){
                    var cats = []
                    $('.breadcrumbs>li>a').each( function(i, el){
                        cats.push($(this).text())
                    })
                    console.log(cats.join(' > '))
                    site['articleCategory'] = (cats.join(' > '))
                }
                console.log(sites)
                res.json(sites)
            }
        })
    })
})

csv()
    .fromFile(csvFilePath)
    .then( jsObj => {
        sites = jsObj
    })

app.listen(PORT, function () {
    console.log("App listening at http://localhost:" + PORT);
})