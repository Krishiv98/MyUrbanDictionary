import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from 'express'
import { DictionaryUser } from '../entity/DictionaryUser'
// import { Controller } from '../decorator/Controller'
// import { Route } from '../decorator/Route'
// import { validate, ValidationError, ValidatorOptions } from 'class-validator'

@Controller('/students')
export default class StudentController {
  private readonly studentRepo = AppDataSource.getRepository(DictionaryUser) // Student Repository

  // https://github.com/typestack/class-validator#passing-options
  private readonly validOptions: ValidatorOptions = {
    stopAtFirstError: true,
    skipMissingProperties: false,
    validationError: {
      target: false,
      value: false
    }
  }

  @Route('get', '/:id*?') // the *? makes the param optional - see https://expressjs.com/en/guide/routing.html#route-paramters

  async read (req: Request, res: Response, next: NextFunction): Promise<Student | Student[]> {
    if (req.params.id) return await this.studentRepo.findOneBy({ id: req.params.id })
    else {
      const findOptions: any = { order: {} } // prepare order and where props
      const existingFields = this.studentRepo.metadata.ownColumns.map((col) => col.propertyName)
      console.log(req.query)
      if (req.query.searchwherelike) {
        findOptions.where = []
        for (const existingField of existingFields) {
          findOptions.where.push({ [existingField]: Like('%' + req.query.searchwherelike + '%') })
        }
      }
      const sortField: string = existingFields.includes(req.query.sortby) ? req.query.sortby : 'id'
      findOptions.order[sortField] = req.query.reverse ? 'DESC' : 'ASC'
      // findOptions looks like{ order {phone: 'ASC'} }
      return await this.studentRepo.find(findOptions)
    }
  }

  @Route('delete', '/:id')
  async delete (req: Request, res: Response, next: NextFunction): Promise<Student> {
    const studentToRemove = await this.studentRepo.findOneBy({ id: req.params.id })
    // res.statusCode = 204 -- browser will complain since we are actually returning content
    if (studentToRemove) return await this.studentRepo.remove(studentToRemove)
    else next()
  }

  @Route('put', '/:id')
  async update (req: Request, res: Response, next: NextFunction): Promise<Student | ValidationError[]> {
    /*     PRELOAD - https://typeorm.io/#/repository-api
        Creates a new entity from the a plain javascript object.
        If the entity already exists in the database, then it loads it and replaces all values with the new ones from the given object,
        and returns a new entity that is actually an entity loaded from the database with all properties replaced from the new object.
        Note that given entity-like object must have an entity id / primary key to find entity by.
        Returns undefined if entity with given id was not found.
        */
    const studentToUpdate = await this.studentRepo.preload(req.body)

    // Extra validation - ensure the id param matached the id submitted in the body
    if (!studentToUpdate || studentToUpdate.id.toString() !== req.params.id) next() // pass the buck until 404 error is sent
    else {
      const violations = await validate(studentToUpdate, this.validOptions)
      if (violations.length) {
        res.statusCode = 422 // Unprocessable Entity
        return violations
      } else {
        return await this.studentRepo.save(studentToUpdate)
      }
    }
  }

  @Route('post')
  async save (req: Request, res: Response, next: NextFunction): Promise<any> {
    // Extra validation - ensure the id param matached the id submitted in the body
    const newStudent = Object.assign(new Student(), req.body)
    const violations = await validate(newStudent, this.validOptions)
    if (violations.length) {
      res.statusCode = 422 // Unprocessable Entity
      return violations
    } else {
      res.statusCode = 201
      return await this.studentRepo.save(newStudent)
    }
  }
}
