import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { IsNotEmpty, IsOptional, MaxLength, Min } from 'class-validator'
import { DictionaryUser } from './DictionaryUser'
import { UrbanTerm } from './UrbanTerm'

@Entity()
export class UrbanTermDefinition {
  @PrimaryGeneratedColumn()
  @IsOptional()
    id: number

  @ManyToOne(() => DictionaryUser, (user) => user.definitions, { cascade: true })
    user: DictionaryUser

  @ManyToOne(() => UrbanTerm, (term) => term.definitions, { cascade: true })
    urbanterm: UrbanTerm

  @Column({ type: 'varchar', nullable: false })
  @MaxLength(250, { message: 'Definition must be less than 250 chars' })
  @IsNotEmpty({ message: 'A Definition must have a Definition' })
    definition: string

  @Column({ type: 'integer', default: 0 })
  @IsOptional()
  @Min(0, { message: 'Number of likes must not be less than 0' })
    likes: number

  @Column({ type: 'integer', default: 0 })
  @IsOptional()
  @Min(0, { message: 'Number of likes must not be less than 0' })
    dislikes: number
}
