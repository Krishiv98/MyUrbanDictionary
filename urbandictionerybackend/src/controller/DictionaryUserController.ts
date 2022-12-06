import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from 'express'
import { DictionaryUser } from '../entity/DictionaryUser'
import { Controller } from '../decorator/Controller'
import { Route } from '../decorator/Route'
import { validate, ValidationError, ValidatorOptions } from 'class-validator'
import { UrbanTermDefinition } from '../entity/UrbanTermDefinition'

@Controller('/Users')
export default class DictionaryUserController {
  private readonly userRepo = AppDataSource.getRepository(DictionaryUser) // Student Repository
  private readonly defRepo = AppDataSource.getRepository(UrbanTermDefinition) // Student Repository

  // https://github.com/typestack/class-validator#passing-options
  private readonly validOptions: ValidatorOptions = {
    stopAtFirstError: true,
    skipMissingProperties: false,
    validationError: {
      target: false,
      value: false
    }
  }

  @Route('get', '/:id')
  async read (req: Request, res: Response, next: NextFunction): Promise<DictionaryUser> {
    if (req.body) {
      const userToCheck = await this.userRepo.findOneBy({ id: req.params.id })
      if (userToCheck.Password.localeCompare(req.body.Password) === 0) {
        res.status = 201
        return userToCheck
      } else {
        res.status = 401
        return req.body
      }
    }

    return await this.userRepo.findOneBy({ id: req.params.id })
  }

  @Route('delete', '/:id')
  async delete (req: Request, res: Response, next: NextFunction): Promise<DictionaryUser> {
    const userToRemove = await this.userRepo.findOneBy({ id: req.params.id })
    res.status = 204
    if (userToRemove) {
      const definitionsToRemove = await this.defRepo.findBy({ UserID: userToRemove.id })
      for (const def of definitionsToRemove) {
        await this.defRepo.remove(def)
      }
      return await this.userRepo.remove(userToRemove)
    } else next()
  }

  @Route('put', '/:id')
  async update (req: Request, res: Response, next: NextFunction): Promise<DictionaryUser | ValidationError[]> {
    const userToUpdate = await this.userRepo.preload(req.body)

    // Extra validation - ensure the id param matached the id submitted in the body
    if (!userToUpdate || userToUpdate.id.toString() !== req.params.id) next() // pass the buck until 404 error is sent
    else {
      const violations = await validate(userToUpdate, this.validOptions)
      if (violations.length) {
        res.statusCode = 422 // Unprocessable Entity
        return violations
      } else {
        return await this.userRepo.save(userToUpdate)
      }
    }
  }

  @Route('post')
  async save (req: Request, res: Response, next: NextFunction): Promise<any> {
    // Extra validation - ensure the id param matached the id submitted in the body
    const newUser = Object.assign(new DictionaryUser(), req.body)
    const violations = await validate(newUser, this.validOptions)
    if (violations.length) {
      res.statusCode = 422 // Unprocessable Entity
      return violations
    } else {
      res.statusCode = 201
      return await this.userRepo.save(newUser)
    }
  }
}
