const { createServer } = require('https')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')
const path = require('path')

const hostname = 'localhost'
const port = 3000
const app = next({ dev: true, hostname, port })

const handle = app.getRequestHandler()

const httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname, './localhost-key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, './localhost.pem'))
}

app.prepare().then(() => {
  createServer(httpsOptions, async (req, res) => {
    const parsedUrl = parse(req.url, true)
    // const { pathname, query } = parsedUrl
    // const baseURL = 'https://' + req.headers.host + '/'
    // const reqUrl = new URL(req.url, baseURL)
    await handle(req, res, parsedUrl)
  }).listen(port, err => {
    if (err) throw err
    console.log('> Ready on https://localhost:3000/')
  })
})
