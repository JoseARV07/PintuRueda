import { Sequelize } from "sequelize";
export const sequelize = new Sequelize(
   "Pinturueda",
"admin",
   "020401Juancho@",
    {
        host: "149.130.161.21",
        dialect: "mysql",
        port: 3306,
    }
);

async function generateDb() {
    await sequelize.sync({ force: true });
    console.log("Base de datos y tablas creadas");
}

generateDb();