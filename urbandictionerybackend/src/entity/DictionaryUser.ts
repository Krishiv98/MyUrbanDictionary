import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class DictionaryUser {
  @PrimaryGeneratedColumn()
    DictionaryUserid: number

  @Column()
    DisplayName: string

  @Column()
    UserName: string

  @Column()
    Password: number
}
