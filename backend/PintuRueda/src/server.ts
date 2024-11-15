import { App } from "./config/index"; // Importa la clase App desde config
import "dotenv/config"; // Carga las variables de entorno

async function main() {
    const app = new App(parseInt(process.env.PORT as string, 10) || 4000); // Inicializa App con el puerto
    await app.start(); // Inicia el servidor
}

main();