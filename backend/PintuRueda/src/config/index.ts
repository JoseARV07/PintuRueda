import express, { Application } from "express";
import IndexRoutes from "../routes/index.routes";
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from "cookie-parser";

export class App {
  private app: Application;
  public Routes = new IndexRoutes();

  constructor(private port: number) {
    this.app = express();
    this.setting();
    this.middlewares();
    this.routes();
  }

  private setting(): void {
    this.app.set("port", this.port);
  }

  private middlewares(): void {
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors({
      origin: "http://localhost:4200",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true
    }));
    this.app.use(cookieParser());
  }

  private routes(): void {
    // Asumiendo que cada Router tiene un método 'router' para obtener la instancia de Router
    this.app.use('/auth', this.Routes.UserRoutes.router);
    this.app.use('/products', this.Routes.productRoutes.router);
    this.app.use('/cart', this.Routes.cartRoutes.router);
    this.app.use('/cart-detail', this.Routes.cartDetailRoutes.router);
    this.app.use('/orders', this.Routes.orderRoutes.router);
    this.app.use('/order-detail', this.Routes.orderDetailRoutes.router);
    this.app.use('/sale', this.Routes.ventaRoutes.router);
    this.app.use('/sale-detail', this.Routes.saleDetailRoutes.router);
  }

  async start(): Promise<void> {
    await this.app.listen(this.app.get("port"));
    console.log("Server on port", this.app.get("port"));
  }
}
