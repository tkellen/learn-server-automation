const fs = require('fs')
const path = require('path')
const express = require('express')
const marked = require('marked')
const server = express()
const exerciseDir = path.join(__dirname, '../..', 'exercises')

function titleize (word) {
  return word.split('-').slice(1).join(' ').toUpperCase()
}
function toAnchorList (items) {
  const lis = items.map(item => `<li><a href="/${item}">${titleize(item)}</li>`)
  return `<ul>${lis.join('')}</ul>`
}
function page (content) {
  return `
  <html lang="en-US">
    <head>
      <title></title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
      html {
        font-family: monospace;
        background-color: #222;
        color: #eee;
      }
      body {
        padding: 1em;
        font-size: 1.5em;
      }
      h1,h2,h3,h4,h5 {
        color: #adff2f;
      }
      a {
        color: #adff2f;
        text-decoration: none;
      }
      li { margin-top: 1em; }
      code, pre {
        padding: 0 .25em;
        background-color: #444;
        border-radius: 3px;
        font-size: 0.90em;
      }
      pre {
        display: inline-block;
        padding: 1em;
      }
      </style>
    </head>
    <body>
      ${content}
    </body>
  </html>`
}

server.get('/', (req, res) => {
  const exercises = fs.readdirSync('../../exercises')
  res.send(page(`
    <h1>Learn Server Automation With Ansible</h1>
    ${toAnchorList(exercises)}
  `))
})

server.get('/:exercise', (req, res) => {
  try {
    const source = path.join(exerciseDir, req.params.exercise, 'overview.md')
    const content = fs.readFileSync(source, 'utf-8')
    res.send(page(`
      <a href='/'>&laquo; BACK</a><br>
      ${marked(content)}
      <br><a href='/'>&laquo; BACK</a>
    `))
  } catch (e) {
    res.sendStatus(404)
  }
})

server.listen(8080)
