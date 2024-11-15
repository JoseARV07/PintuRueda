import { UserRoutes } from './user.routes';
import { ProductRoutes } from './product.routes';
import { CartRoutes } from './cart.routes';
import { CartDetailRoutes } from './cartDetail.routes';
import { OrderRoutes } from './order.routes';
import { OrderDetailRoutes } from './orderDetail.routes';
import { VentaRoutes } from './venta.routes';
import { SaleDetailRoutes } from './detalleVenta.routes';

export default class IndexRoutes {
    public UserRoutes = new UserRoutes();
    public productRoutes = new ProductRoutes();
    public cartRoutes = new CartRoutes();
    public cartDetailRoutes = new CartDetailRoutes();
    public orderRoutes = new OrderRoutes();
    public orderDetailRoutes = new OrderDetailRoutes();
    public ventaRoutes = new VentaRoutes();
    public saleDetailRoutes = new SaleDetailRoutes();
}
