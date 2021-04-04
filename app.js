const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const md = require('markdown-it')()
const util = require('util')

const readFilePromise = util.promisify(fs.readFile)

app.get('/*', async (req, res) => {
  try {
    const markdownData = await readFilePromise(path.join(__dirname, 'content', req.url) + '/index.md', 'utf8')
    const convertedHTMLData = md.render(markdownData)
    const originalTemplate = await readFilePromise(path.join(__dirname, '/template.html'), 'utf8')
    const newTemplate = originalTemplate.replace(/\{\{content\}\}/, convertedHTMLData)
    res.send(newTemplate)
  } catch (err) {
      res.status(404).send('Page doesn\'t exist!')
  } 
})

app.listen(3000)

module.exports = app