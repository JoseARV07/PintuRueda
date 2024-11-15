import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { Pedido } from "./pedido.model";
import { Producto } from "./producto.model";

export class DetallePedido extends Model {
    public id!: number;
    public id_pedido!: number;
    public id_producto!: number;
    public cantidad!: number;
    public precio_unitario!: number;
    public subtotal!: number;
}

export interface GetDetallePedidoAttributes {
    id: number;
    id_pedido: number;
    id_producto: number;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
}

export type AddDetallePedidoAttributes = Omit<GetDetallePedidoAttributes, 'id'>;

DetallePedido.init({
    id_pedido: {
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
    precio_unitario: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'detalle_pedido',
    sequelize,
    timestamps: false
});

Pedido.hasMany(DetallePedido, {foreignKey: "DetallePedidoId" as "DetalleP"})
DetallePedido.belongsTo(Pedido, {foreignKey: "DetallePedidoId" as "Pedido"})

// Relación con el modelo Producto
Producto.hasMany(DetallePedido, { foreignKey: 'id_pedido', as: 'detallesP' });
DetallePedido.belongsTo(Producto, { foreignKey: 'id_pedido', as: 'productoP' });