import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class UrbanTermDefinition {
  @PrimaryGeneratedColumn()
    DefinitionID: number

  @Column()
    UserID: number

  @Column()
    UrbanTermID: number

  @Column()
    Definition: string

  @Column()
    Likes: number

  @Column()
    Dislikes: number
}
