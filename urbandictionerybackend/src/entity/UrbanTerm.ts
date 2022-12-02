import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class UrbanTerm {
  @PrimaryGeneratedColumn()
    UrbanTermID: number

  @Column()
    UrbanTerm: string

  @Column()
    NumOfDefinitions: number
}
