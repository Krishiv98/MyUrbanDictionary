import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from 'express'
import { UrbanTerm } from '../entity/UrbanTerm'
import { Controller } from '../decorator/Controller'
import { Route } from '../decorator/Route'
import { validate, ValidationError, ValidatorOptions } from 'class-validator'
import { Like } from 'typeorm'
import { UrbanTermDefinition } from '../entity/UrbanTermDefinition'
import { DictionaryUser } from '../entity/DictionaryUser'

@Controller('/definition')
export default class UrbanTermDefinitionController {
  private readonly defRepo = AppDataSource.getRepository(UrbanTermDefinition) // Definition Repository
  private readonly termRepo = AppDataSource.getRepository(UrbanTerm) // Term Repository
  private readonly userRepo = AppDataSource.getRepository(DictionaryUser) // User Repository

  // https://github.com/typestack/class-validator#passing-options
  private readonly validOptions: ValidatorOptions = {
    stopAtFirstError: true,
    skipMissingProperties: false,
    validationError: {
      target: false,
      value: false
    }
  }

  @Route('get', '/:id*?')
  async read (req: Request, res: Response, next: NextFunction): Promise<UrbanTermDefinition | UrbanTermDefinition[]> {
    if (req.params.id) {
      return await this.defRepo.findOne({
        relations: { urbanterm: true, user: true },
        where: { id: req.params.id }
      })
    } else {
      const findOptions: any = { order: {} } // prepare order and where props
      const existingFields = this.defRepo.metadata.ownColumns.map((col) => col.propertyName)
      console.log(req.query)
      if (req.query.search) {
        findOptions.where = []
        for (const existingField of existingFields) {
          findOptions.where.push({ [existingField]: Like('%' + req.query.searchwherelike + '%') })
        }
      }
      const sortField: string = existingFields.includes(req.query.sortby) ? req.query.sortby : 'id'
      findOptions.order[sortField] = req.query.reverse ? 'DESC' : 'ASC'
      // findOptions looks like{ order {phone: 'ASC'} }
      return await this.defRepo.find(findOptions)
    }
  }

  @Route('put', '/:id')
  async update (req: Request, res: Response, next: NextFunction): Promise<UrbanTermDefinition | ValidationError[]> {
    const defToUpdate = await this.defRepo.preload(req.body)

    // Extra validation - ensure the id param matached the id submitted in the body
    if (!defToUpdate || defToUpdate.id.toString() !== req.params.id) next() // pass the buck until 404 error is sent
    else {
      const violations = await validate(defToUpdate, this.validOptions)
      if (violations.length) {
        res.status = 422 // Unprocessable Entity
        return violations
      } else {
        return await this.defRepo.save(defToUpdate)
      }
    }
  }

  @Route('delete', '/:id')
  async delete (req: Request, res: Response, next: NextFunction): Promise<UrbanTermDefinition> {
    const defToRemove = await this.defRepo.findOne({ relations: { urbanterm: true }, where: { id: req.params.id } })
    res.status = 204
    console.log(defToRemove)
    if (defToRemove) {
      const term = await this.termRepo.findOne({
        relations: { definitions: true },
        where: { id: defToRemove.urbanterm.id }
      })
      term.NumOfDefinitions--
      term.definitions.splice(term.definitions.indexOf(defToRemove), 1)
      return await this.defRepo.remove(defToRemove)
    } else next()
  }

  @Route('post')
  async save (req: Request, res: Response, next: NextFunction): Promise<any> {
    // Extra validation - ensure the id param matached the id submitted in the body
    const newDef = Object.assign(new UrbanTermDefinition(), req.body)
    const violations = await validate(newDef, this.validOptions)
    if (violations.length) {
      res.status = 422 // Unprocessable Entity
      return violations
    } else {
      const term = await this.termRepo.findOne({ relations: { definitions: true }, where: { id: newDef.urbanterm } })
      const user = await this.userRepo.findOne({ relations: { definitions: true }, where: { id: newDef.user } })
      term.NumOfDefinitions++
      newDef.user = user
      newDef.urbanterm = term
      term.definitions.push(newDef)
      user.definitions.push(newDef)
      await this.termRepo.save(term)
      await this.userRepo.save(user)
      res.statusCode = 201
      return await this.defRepo.save(newDef)
    }
  }
}
