const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const marked = require('marked')
const exerciseDir = path.join(__dirname, '..', 'exercises')
const exercises = fs.readdirSync(exerciseDir)

function titleize (word) {
  return word.split('-').slice(1).join(' ').toUpperCase()
}
function toAnchorList (items) {
  const lis = items.map(item => `<li><a href="/${item}.html">${titleize(item)}</li>`)
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

const outputTo = path.join(__dirname, 'dist')
rimraf.sync(outputTo)
fs.mkdirSync(outputTo)
fs.writeFileSync(path.join(outputTo, 'index.html'), page(`
  <h1>Learn Server Automation With Ansible</h1>
  ${toAnchorList(exercises)}
`))
exercises.forEach(exercise => fs.writeFileSync(path.join(outputTo, `${exercise}.html`), page(`
  <a href='/'>&laquo; BACK</a><br>
  ${marked(fs.readFileSync(path.join(exerciseDir, exercise, 'overview.md'), 'utf-8'))}
  <br><a href='/'>&laquo; BACK</a>
`)))
