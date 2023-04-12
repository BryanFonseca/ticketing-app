import { Optional } from "sequelize";
import { Model, Column, Table } from "sequelize-typescript";

interface UserAttributes {
    id: number;
    email: string;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

@Table
export class User extends Model<UserAttributes, UserCreationAttributes> {
    @Column
    email!: string;

    @Column
    password!: string;
}
