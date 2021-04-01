const express = require('express');
const fs = require('fs');
const path = require('path');
const md = require('markdown-it')();
const app = express();

app.get('/*', (req, res) => {
  fs.readFile(path.join(__dirname, 'content', req.url) + '/index.md','utf8', (err, data) => { 
    if (err) {
      res.status(404).send('Page doesn\'t exist!')
    } else {
      const convertedData = md.render(data)
      fs.readFile(path.join(__dirname, '/template.html'), 'utf8', (err, data) => {
        data = data.replace(/\{\{content\}\}/, convertedData)
        res.send(data)
      })
    }
  })
})

app.listen(3000) 

module.exports = app