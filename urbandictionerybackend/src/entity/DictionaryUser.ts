import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { IsNotEmpty, IsOptional, Length, Matches } from 'class-validator'
import { UrbanTermDefinition } from './UrbanTermDefinition'

@Entity()
export class DictionaryUser {
  @PrimaryGeneratedColumn()
  @IsOptional()
    id: number

  @OneToMany(() => UrbanTermDefinition, (def) => def.user, { onDelete: 'CASCADE' })
    definitions: UrbanTermDefinition[]

  @Column({ type: 'varchar', nullable: false })
  @Length(3, 25, { message: 'DisplayName must be from $constraint1 to $constraint2 characters' })
  @IsNotEmpty({ message: 'DisplayName is Required' })
    DisplayName: string

  @Column({ type: 'varchar', nullable: false })
  @Length(3, 25, { message: 'UserName must be from $constraint1 to $constraint2 characters' })
  @IsNotEmpty({ message: 'UserName is Required' })
    UserName: string

  @Column({ type: 'varchar', nullable: false, select: false })
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'Password must contain uppercase, lowercase, and numbers' }
  )
  @Length(8, 25, { message: 'Password must be from $constraint1 to $constraint2 characters' })
  @IsNotEmpty({ message: 'Password is Required' })
    Password: string
}
