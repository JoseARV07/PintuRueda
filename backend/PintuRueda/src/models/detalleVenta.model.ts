import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { Venta } from "./venta.model"; // Ajusta la ruta según tu estructura
import { Producto } from "./producto.model"; // Ajusta la ruta según tu estructura

export class DetalleVenta extends Model {
    public id!: number;
    public id_venta!: number; // Referencia a la venta
    public id_producto!: number; // Referencia al producto
    public cantidad!: number;
    public precio_unitario!: number;
    public subtotal!: number;
}

export interface GetDetalleVentaAttributes {
    id: number;
    id_venta: number;
    id_producto: number;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
}

export type AddDetalleVentaAttributes = Omit<GetDetalleVentaAttributes, 'id'>;

DetalleVenta.init({
    id_venta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ventas', // Nombre de la tabla a la que hace referencia
            key: 'id'
        }
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'productos', // Nombre de la tabla a la que hace referencia
            key: 'id'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio_unitario: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'detalle_venta',
    sequelize,
    timestamps: false
});

// Relación con el modelo Venta
Venta.hasMany(DetalleVenta, { foreignKey: 'id_venta', as: 'detalles' });
DetalleVenta.belongsTo(Venta, { foreignKey: 'id_venta', as: 'venta' });

// Relación con el modelo Producto
Producto.hasMany(DetalleVenta, { foreignKey: 'id_producto', as: 'detallesProducto' });
DetalleVenta.belongsTo(Producto, { foreignKey: 'id_producto', as: 'producto' });
