import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { IsNotEmpty, IsOptional, Length, MaxLength, Min } from 'class-validator'
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

  @Column({ type: 'varchar', nullable: false })
    term: string

  @Column({ type: 'varchar', nullable: false })
  @Length(3, 25, { message: 'DisplayName must be from $constraint1 to $constraint2 characters' })
  @IsNotEmpty({ message: 'DisplayName is Required' })
    displayname: string
}
