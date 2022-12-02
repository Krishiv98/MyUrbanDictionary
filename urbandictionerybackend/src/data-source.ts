import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { DictionaryUser } from './entity/DictionaryUser'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [DictionaryUser],
  migrations: [],
  subscribers: []
})
