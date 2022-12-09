import {
  IsNotEmpty, IsOptional, Length, Matches,
} from 'class-validator';
import UrbanTermDefinition from './UrbanTermDefinition';

export default class DictionaryUser {
  @IsOptional()
    id!: number

    definitions!: UrbanTermDefinition[]

  @Length(3, 25, { message: 'DisplayName must be from $constraint1 to $constraint2 characters' })
  @IsNotEmpty({ message: 'DisplayName is Required' })
    DisplayName!: string

  @Length(3, 25, { message: 'UserName must be from $constraint1 to $constraint2 characters' })
  @IsNotEmpty({ message: 'UserName is Required' })
    UserName!: string

  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'Password must contain uppercase, lowercase, and numbers' },
  )
  @Length(8, 25, { message: 'Password must be from $constraint1 to $constraint2 characters' })
  @IsNotEmpty({ message: 'Password is Required' })
    Password!: string
}
