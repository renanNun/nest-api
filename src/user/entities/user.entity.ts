import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export enum UserRole {
    ADMIN = "admin",
    GHOST = "ghost"
}


@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    name: string;

    @Column({
        name: 'email',
        type: 'varchar',
        length: 255,
        unique: true,
        nullable: false
    })
    email: string;

    @Column({
        name: 'password',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    password: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.GHOST
    })
    role: UserRole;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;
}
