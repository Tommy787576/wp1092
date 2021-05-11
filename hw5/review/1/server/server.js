import express from 'express'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import util from 'util';

import guessRoute from './routes/guess'
import getTime from './core/time'

const isProduction = process.env.NODE_ENV === 'production'

const app = express()

// init middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  if (isProduction && req.headers['x-forwarded-proto'] !== 'https')
    return res.redirect('https://' + req.headers.host + req.url)
  return next()
})

// define routes
app.use('/api/guess', guessRoute)

const port = process.env.PORT || 4000

if (isProduction) {
  // set static folder
  const publicPath = path.join(__dirname, '..', 'build')

  app.use(express.static(publicPath))

  app.get('*', (_, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})

const current_time = getTime()
fs.promises.mkdir(`${__dirname}/log`, { recursive: true })

const log_file = fs.createWriteStream(`${__dirname}/log/${current_time}.log`, {flags: 'w'})
const log2file = (v) => {
    log_file.write(util.format(v) + '\n');
}

export default log2file

