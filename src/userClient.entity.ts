import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('usersClient')
export class UserClient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Name: string;

    @Column()
    Phone: string;

    @Column({unique: true})
    Email: string;

    @Column()
    password: string;
} 