import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";

export class Producto extends Model {
    public id!: number;
    public nombre!: string;
    public imagen!: string;
    public categoria!: string;
    public descripcion!: string;
    public precio!: number;
    public stock!: number;
    public tipo_producto!: 'pintura' | 'herramienta';
    public fecha_agregado!: Date;
    public codigo!:string;
}

export interface GetProductoAttributes {
    id: number;
    nombre: string;
    imagen: string;
    categoria: string;
    descripcion: string;
    precio: number;
    stock: number;
    tipo_producto: 'pintura' | 'herramienta';
    fecha_agregado: Date;
    codigo:string;
  }

export type AddProductoAttributes = Omit<GetProductoAttributes, 'id'>;

Producto.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen:{
        type:DataTypes.STRING,
        allowNull:false
    },
    categoria:{
        type:DataTypes.STRING,
        allowNull:true
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER, // Cambiado a INTEGER
        allowNull: false
    },
    tipo_producto: {
        type: DataTypes.ENUM('pintura', 'herramienta'),
        allowNull: false
    },
    fecha_agregado: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    codigo:{
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'productos',
    sequelize,
    timestamps: false
});

