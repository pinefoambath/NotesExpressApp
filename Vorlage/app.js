import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import session from 'express-session'
import exphbs from 'express-handlebars'

import { indexRoutes } from './routes/index-routes.js'
import { helpers } from './utils/handlebar-util.js'
import { sessionUserSettings } from './utils/session-middleware.index.js'

export const app = express()
const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'default',
  helpers: {
    ...helpers,
    importanceIcons: (importance) => {
      let result = ''
      for (let i = 0; i < importance; i++) {
        result += '<b>⚡️</b>'
      }
      return new hbs.handlebars.SafeString(result)
    }
  }
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.resolve('views'))

app.use(express.static(path.resolve('public')))
app.use(
  session({
    secret: 'casduichasidbnuwezrfinasdcvjkadfhsuilfuzihfioda',
    resave: false,
    saveUninitialized: true
  })
)
app.use(sessionUserSettings)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', indexRoutes)
app.use(
  '/public',
  express.static('public', {
    setHeaders: (res, path, stat) => {
      if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css')
      }
    }
  })
)
