import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from './data-source'
import { DictionaryUser } from './entity/DictionaryUser'
import { DictionaryUserController } from './controller/DictionaryUserController'
import * as createError from 'http-errors'
import { RouteDefinition } from './decorator/RouteDefinition'

AppDataSource.initialize().then(async () => {
  // create express app
  const app = express()
  app.use(bodyParser.json())

  // register express routes from defined application routes
  const controllers: any[] = [DictionaryUserController]
  // Iterate over all our controllers and register our routes
  controllers.forEach((controller) => {
    // This is our instantiated class
    // eslint-disable-next-line new-cap
    const instance = new controller()
    // The prefix saved to our controller
    const path = Reflect.getMetadata('path', controller)
    // Our `routes` array containing all our routes for this controller
    const routes: RouteDefinition[] = Reflect.getMetadata('routes', controller)

    // Iterate over all routes and register them to our express application
    routes.forEach((route) => {
      // eslint-disable-next-line max-len,
      app[route.method.toLowerCase()](path + route.param, (req: Request, res: Response, next: NextFunction) => {
        const result = instance[route.action](req, res, next)
        if (result instanceof Promise) {
          result.then((result) => result !== null && result !== undefined ? res.send(result) : next())
            .catch((err) => next(createError(500, err)))
        } else if (result !== null && result !== undefined) res.json(result)
      })
    })
  })

  // setup express app here
  // ...

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404))
  })

  // error handler
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({ status: err.status, message: err.message, stack: err.stack.split(/\s{4,}/) })
  })

  // start express server
  app.listen(3008)

  // insert new users for test
  // await AppDataSource.manager.save(
  //   AppDataSource.manager.create(DictionaryUser, {
  //     firstName: 'Timber',
  //     lastName: 'Saw',
  //     age: 27
  //   })
  // )
  //
  // await AppDataSource.manager.save(
  //   AppDataSource.manager.create(DictionaryUser, {
  //     firstName: 'Phantom',
  //     lastName: 'Assassin',
  //     age: 24
  //   })
  // )

  console.log('Express server has started on port 3008. Open http://localhost:3008/ to see results')
}).catch(error => console.log(error))
