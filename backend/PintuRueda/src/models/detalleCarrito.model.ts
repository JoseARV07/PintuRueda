import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { Carrito } from "./carrito.model"; // Asegúrate de que esta importación sea correcta
import { Producto } from "./producto.model"; // Asegúrate de que esta importación sea correcta

export class DetalleCarrito extends Model {
    public id!: number;
    public id_carrito!: number;
    public id_producto!: number;
    public cantidad!: number;
    public subtotal!: number;
}

export interface GetDetalleCarritoAttributes {
    id: number;
    id_carrito: number;
    id_producto: number;
    cantidad: number;
    subtotal: number;
}

export type AddDetalleCarritoAttributes = Omit<GetDetalleCarritoAttributes, 'id'>;

DetalleCarrito.init({
    id_carrito: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'detalle_carrito',
    sequelize,
    timestamps: false
});

// Relación con el modelo Carrito
Carrito.hasMany(DetalleCarrito, { foreignKey: 'id_carrito', as: 'detalles' });
DetalleCarrito.belongsTo(Carrito, { foreignKey: 'id_carrito', as: 'carrito' });

// Relación con el modelo Producto
Producto.hasMany(DetalleCarrito, { foreignKey: 'id_producto', as: 'detalles' });
DetalleCarrito.belongsTo(Producto, { foreignKey: 'id_producto', as: 'producto' });

