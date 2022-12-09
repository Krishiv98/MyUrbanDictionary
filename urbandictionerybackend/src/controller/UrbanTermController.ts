import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from 'express'
import { UrbanTerm } from '../entity/UrbanTerm'
import { Controller } from '../decorator/Controller'
import { Route } from '../decorator/Route'
import { validate, ValidatorOptions } from 'class-validator'
import { Like } from 'typeorm'
import { UrbanTermDefinition } from '../entity/UrbanTermDefinition'

@Controller('/term')
export default class UrbanTermController {
  private readonly termRepo = AppDataSource.getRepository(UrbanTerm) // Term Repository
  private readonly defRepo = AppDataSource.getRepository(UrbanTermDefinition) // Definition Repository

  // https://github.com/typestack/class-validator#passing-options
  private readonly validOptions: ValidatorOptions = {
    stopAtFirstError: true,
    skipMissingProperties: false,
    validationError: {
      target: false,
      value: false
    }
  }

  @Route('GET', '/:id*?')
  async read (req: Request, res: Response, next: NextFunction): Promise<UrbanTerm | UrbanTerm[]> {
    if (req.params.id) {
      return await this.termRepo.findOne({
        relations: { definitions: true }, where: { id: req.params.id }
      })
    } else {
      const findOptions: any = { order: {} } // prepare order and where props
      const existingFields = this.termRepo.metadata.ownColumns.map((col) => col.propertyName)
      if (req.query.search) {
        findOptions.where = []
        for (const existingField of existingFields) {
          findOptions.where.push({ [existingField]: Like('%' + req.query.searchwherelike + '%') })
        }
      }
      const sortField: string = existingFields.includes(req.query.sortby) ? req.query.sortby : 'id'
      findOptions.order[sortField] = req.query.reverse ? 'DESC' : 'ASC'
      findOptions.relations = { definitions: true }
      // findOptions looks like{ order {phone: 'ASC'} }
      const terms = await this.termRepo.find(findOptions)
      return res.json(terms)
    }
  }

  @Route('delete', '/:id')
  async delete (req: Request, res: Response, next: NextFunction): Promise<UrbanTerm> {
    const termToRemove = await this.termRepo.findOne({ relations: { definitions: true }, where: { id: req.params.id } })
    res.status = 204
    if (termToRemove) {
      if (termToRemove.definitions) {
        for (const def of termToRemove.definitions) {
          await this.defRepo.remove(def)
        }
      }
      return await this.termRepo.remove(termToRemove)
    } else next()
  }

  @Route('post')
  async save (req: Request, res: Response, next: NextFunction): Promise<any> {
    // Extra validation - ensure the id param matached the id submitted in the body
    const newTerm = Object.assign(new UrbanTerm(), req.body)
    const termExists = await this.termRepo.findOneBy({ UrbanTerm: newTerm.UrbanTerm })
    if (!termExists) {
      const violations = await validate(newTerm, this.validOptions)
      if (violations.length) {
        res.status = 422 // Unprocessable Entity
        return violations
      } else {
        res.status = 201
        return await this.termRepo.save(newTerm)
      }
    } else next()
  }
}
