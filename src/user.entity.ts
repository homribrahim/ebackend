import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    stationName: string;

    @Column()
    Phone: string;

    @Column()
    Enseigne: string;

    @Column()
    Region: string;

    @Column()
    Location: string;

    @Column()
    Address: string;

    @Column({unique: true})
    Email: string;

    @Column()
    password: string;
}