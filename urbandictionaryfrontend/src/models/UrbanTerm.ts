import {
  IsNotEmpty, IsOptional, MaxLength, Min,
} from 'class-validator';
// eslint-disable-next-line import/no-cycle
import UrbanTermDefinition from './UrbanTermDefinition';

export default class UrbanTerm {
  @IsOptional()
  id!: number

  @IsNotEmpty({ message: 'term is Required' })
  urbanterm!: string

  definitions!: UrbanTermDefinition[]

  @IsOptional()
  @Min(0, { message: 'Num Definitions must not be less than zero' })
  NumOfDefinitions!: number
}
