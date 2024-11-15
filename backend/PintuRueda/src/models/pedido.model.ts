import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { User } from "./user.model";
export class Pedido extends Model {
    public id!: number;
    public id_user!: number; // Cambiado de id_cliente a id_user
    public id_carrito!: number;
    public fecha_pedido!: Date;
    public total!: number;
    public estado!: 'pendiente' | 'procesando' | 'completado' | 'cancelado';
}

export interface GetPedidoAttributes {
    id: number;
    id_user: number; // Cambiado de id_cliente a id_user
    id_carrito: number;
    fecha_pedido: Date;
    total: number;
    estado: 'pendiente' | 'procesando' | 'completado' | 'cancelado';
}

export type AddPedidoAttributes = Omit<GetPedidoAttributes, 'id'>;

Pedido.init({
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_carrito: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_pedido: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'procesando', 'completado', 'cancelado'),
        allowNull: false
    }
}, {
    tableName: 'pedidos',
    sequelize,
    timestamps: false
});

// Relación con el modelo User
User.hasOne(Pedido, { foreignKey: 'id_userp', as: 'usuariop' })
Pedido.belongsTo(User, { foreignKey: 'id_userp', as: 'usuariop' });