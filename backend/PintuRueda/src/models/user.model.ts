import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";

export class User extends Model {
    public id!: number;
    public nombre!: string;
    public email!: string;
    public telefono!: string;
    public direccion!: string;
    public password!: string;
    public role!: 'admin' | 'user';
}

export interface GetUserAttributes {
    id: number;
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
    password: string;
    role: 'admin' | 'user';
}

export type AddUserAttributes = Omit<GetUserAttributes, 'id'>;

User.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false
    }
}, {
    tableName: 'users',
    sequelize,
    timestamps: false
});
