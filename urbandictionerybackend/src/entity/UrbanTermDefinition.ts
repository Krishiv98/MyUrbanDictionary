import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { IsNotEmpty, IsOptional, Length, MaxLength, Min } from 'class-validator'
import { DictionaryUser } from './DictionaryUser'
import { UrbanTerm } from './UrbanTerm'

@Entity()
export class UrbanTermDefinition {
  @PrimaryGeneratedColumn()
  @IsOptional()
    id: number

  @ManyToOne(() => DictionaryUser, (user) => user.id)
  @IsNotEmpty({ message: 'A Definition must be created by a User' })
    UserID: number

  @ManyToOne(() => UrbanTerm, (term) => term.id)
  @IsNotEmpty({ message: 'A Definition must be for a term' })
    UrbanTermID: number

  @Column({ type: 'varchar', nullable: false })
  @MaxLength(250, { message: 'Definition must be less than 250 chars' })
  @IsNotEmpty({ message: 'A Definition must have a Definition' })
    Definition: string

  @Column({ type: 'integer', default: 0 })
  @IsOptional()
  @Min(0, { message: 'Number of likes must not be less than 0' })
    Likes: number

  @Column({ type: 'integer', default: 0 })
  @IsOptional()
  @Min(0, { message: 'Number of likes must not be less than 0' })
    Dislikes: number
}
