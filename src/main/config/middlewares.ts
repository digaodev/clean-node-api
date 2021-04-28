import { Express } from 'express'

import { bodyParser } from '../middlewares/body-parser'

export default function (app: Express): void {
  app.use(bodyParser)
}
