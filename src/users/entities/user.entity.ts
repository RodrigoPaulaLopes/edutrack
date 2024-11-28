import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enums/user.enum";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        nullable: false
    })
    username: string

    @Column({
        nullable: false
    })
    password: string

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.STUDENT,
        nullable: false
    })
    role: Role
}
