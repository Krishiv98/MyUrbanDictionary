import {
  IsNotEmpty, IsOptional, MaxLength, Min,
} from 'class-validator';
// eslint-disable-next-line import/no-cycle
import DictionaryUser from './DictionaryUser';
// eslint-disable-next-line import/no-cycle
import UrbanTerm from './UrbanTerm';

export default class UrbanTermDefinition {
  @IsOptional()
  id!: number

  @IsNotEmpty({ message: 'A Definition must be created by a User' })
  user!: DictionaryUser

  @IsNotEmpty({ message: 'A Definition must be for a term' })
  urbanterm!: UrbanTerm

  @MaxLength(250, { message: 'Definition must be less than 250 chars' })
  @IsNotEmpty({ message: 'A Definition must have a Definition' })
  definition!: string

  @IsOptional()
  @Min(0, { message: 'Number of likes must not be less than 0' })
  likes!: number

  @IsOptional()
  @Min(0, { message: 'Number of likes must not be less than 0' })
  dislikes!: number
}
