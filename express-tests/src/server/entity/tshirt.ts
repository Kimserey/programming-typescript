import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TShirt extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public brand!: string;

    @Column()
    public description!: string;

    @Column()
    public price!: number;
}
