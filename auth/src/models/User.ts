import { Optional } from "sequelize";
import { Model, Column, Table, BeforeSave } from "sequelize-typescript";

import { Password } from "../services/password";

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

    @BeforeSave
    static async hashPassword(instance: User) {
        if (instance.changed('password')) {
            const hashed = await Password.toHash(instance.password);
            instance.password = hashed;
        }
    }
}
