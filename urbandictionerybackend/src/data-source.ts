import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { DictionaryUser } from './entity/DictionaryUser'
import { UrbanTerm } from './entity/UrbanTerm'
import { UrbanTermDefinition } from './entity/UrbanTermDefinition'

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'UrbanDictionarySqlite.db',
  synchronize: true,
  logging: false,
  entities: [DictionaryUser, UrbanTerm, UrbanTermDefinition],
  migrations: [],
  subscribers: []
})
