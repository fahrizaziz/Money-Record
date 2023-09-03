import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class History {
    @PrimaryGeneratedColumn({ type: 'int' })
    id_history: number;

    @Column()
    id_user: number;

    @Column({ type: 'varchar', length: 50 })
    type: string;

    @Column({ type: 'varchar', length: 50 })
    date: string;

    @Column({ type: 'varchar', length: 50 })
    total: string;

    @Column({ type: 'text' })
    details: string;

    @Column({ type: 'timestamp' })
    created_at: string;

    @Column({ type: 'timestamp' })
    updated_at: string;

    @ManyToOne(() => User, (user) => user.historys)
    @JoinColumn({ name: 'id_user' })
    users: User
}
