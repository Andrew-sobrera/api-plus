import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { User } from '../../../domain/user'

@Entity('users')
export class UserEntity extends BaseEntity implements User {
    @PrimaryGeneratedColumn({})
    id!: number

    @Column()
    first_name!: string
    
    @Column()
    last_name!: string

    @Column()
    token!: string
}