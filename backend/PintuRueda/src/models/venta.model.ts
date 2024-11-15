import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { User } from "./user.model";
export class Venta extends Model {
    public id!: number;
    public id_user!: number; // ID del usuario que realiza la compra
    public id_producto!: number; // ID del producto vendido
    public cantidad!: number; // Cantidad del producto vendido
    public precioTotal!: number; // Precio total de la venta
    public fecha!: Date; // Fecha de la venta
}

export interface GetVentaAttributes {
    id: number;
    id_user: number; // ID del usuario que realiza la compra
    id_producto: number; // ID del producto vendido
    cantidad: number; // Cantidad del producto vendido
    precioTotal: number; // Precio total de la venta
    fecha: Date; // Fecha de la venta
}

export type AddVentaAttributes = Omit<GetVentaAttributes, 'id'>;

Venta.init({
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // Aquí puedes agregar una referencia si lo necesitas
        // references: { model: 'usuarios', key: 'id' },
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // Aquí puedes agregar una referencia si lo necesitas
        // references: { model: 'productos', key: 'id' },
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precioTotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    tableName: 'ventas',
    sequelize,
    timestamps: false
});

// Relación con el modelo User
User.hasOne(Venta, { foreignKey: 'id_userv', as: 'usuariov' })
Venta.belongsTo(User, { foreignKey: 'id_userv', as: 'usuariov' });