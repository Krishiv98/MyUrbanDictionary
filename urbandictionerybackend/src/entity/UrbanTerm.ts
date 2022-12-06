import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { IsOptional, Min } from 'class-validator'

@Entity()
export class UrbanTerm {
  @PrimaryGeneratedColumn()
  @IsOptional()
    id: number

  @Column({ type: 'varchar', nullable: false })
    UrbanTerm: string

  @Column({ type: 'integer', nullable: false })
  @IsOptional()
  @Min(0, { message: 'Num Definitions must not be less than zero' })
    NumOfDefinitions: number
}
