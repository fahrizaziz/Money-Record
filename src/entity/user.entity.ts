import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { History } from "./history.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'int' })
    id_user: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'varchar', length: 50 })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ type: 'timestamp' })
    created_at: string;

    @Column({ type: 'timestamp' })
    updated_at: string;

    @OneToMany(() => History, (history) => history.users)
    historys: History[];
}