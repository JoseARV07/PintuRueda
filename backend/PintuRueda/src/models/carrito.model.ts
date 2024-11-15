import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { User } from "./user.model"; // Asegúrate de que esta importación sea correcta

export class Carrito extends Model {
    public id!: number;
    public id_user!: number; // Cambiado de id_cliente a id_user
    public estado!: 'activo' | 'finalizado';
}

export interface GetCarritoAttributes {
    id: number;
    id_user: number; // Cambiado de id_cliente a id_user
    estado: 'activo' | 'finalizado';
}

export type AddCarritoAttributes = Omit<GetCarritoAttributes, 'id'>;

Carrito.init({
    id_user: {
        type: DataTypes.INTEGER, // Cambiado a INTEGER
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('activo', 'finalizado'),
        allowNull: false
    }
}, {
    tableName: 'carrito',
    sequelize,
    timestamps: false
});

// Relación con el modelo User
User.hasOne(Carrito, { foreignKey: 'id_user', as: 'usuario' })
Carrito.belongsTo(User, { foreignKey: 'id_user', as: 'usuario' });
