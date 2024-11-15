import { Routes } from '@angular/router';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes: Routes = [
    {
        path: '',
        component: ClientLayoutComponent,
        children: [
            {
                path:'',
                loadComponent:()=> import('./client/home/home.component').then(m=> m.HomeComponent)
            },
            {
                path:'login',
                loadComponent:()=> import('./client/login/login.component')
                .then(m=> m.LoginComponent)
            },
            {
                path:'signup',
                loadComponent:()=> import('./client/signup/signup.component').then(m=> m.SignupComponent)
            },
            {
                path:'profile',
                loadComponent:()=> import('./client/profile/profile.component').then(m=> m.ProfileComponent)
            },
            {
                path:'cart',
                loadComponent:()=> import('./client/cart/cart.component').then(m=> m.CartComponent)
            }
        ]
    },
    {
        path:'',
        component:AdminLayoutComponent,
        children:[
            {
                path:'admin/login',
                loadComponent:()=> import('./admin/login/login.component').then(m=> m.LoginComponent)
            },
            {
                path:'admin/signup',
                loadComponent:()=> import('./admin/register/register.component').then(m=> m.RegisterComponent)
            },
            {
                path:'admin/dashboard/manager',
                loadComponent:()=> import('./admin/dashboard/dashboard.component').then(m=> m.DashboardComponent)
            },
            {
                path:'admin/dashboard/clientes',
                loadComponent:()=> import('./admin/dashboard/mostrar-cliente/mostrar-cliente.component').then(m=> m.MostrarClienteComponent)
            },
            {
                path:'admin/dashboard/create',
                loadComponent:()=> import('./admin/dashboard/crear-cliente/crear-cliente.component').then(m=> m.CrearClienteComponent)
            },
            {
                path:'admin/dashboard/update/:id',
                loadComponent:()=> import('./admin/dashboard/actualizar-cliente/actualizar-cliente.component').then(m=> m.ActualizarClienteComponent)
            },
            {
                path:'admin/dashboard/pinturas',
                loadComponent:()=> import('./admin/dashboard/mostrar-pintura/mostrar-pintura.component').then(m=> m.MostrarPinturaComponent)
            },
            {
                path:'admin/dashboard/create-pintura',
                loadComponent:()=>import('./admin/dashboard/crear-pintura/crear-pintura.component').then(m=>m.CrearPinturaComponent)
            },
            {
                path:'admin/dashboard/update-pintura/:id',
                loadComponent:()=>import('./admin/dashboard/actualizar-pintura/actualizar-pintura.component').then(m=> m.ActualizarPinturaComponent)
            },
            {
                path:'admin/dashboard/herramientas',
                loadComponent:()=> import('./admin/dashboard/mostrar-herramienta/mostrar-herramienta.component').then(m=> m.MostrarHerramientaComponent)
            },
            {
                path:'admin/dashboard/create-herramienta',
                loadComponent:()=>import('./admin/dashboard/crear-herramienta/crear-herramienta.component').then(m=>m.CrearHerramientaComponent)
            },
            {
                path:'admin/dashboard/update-herramienta/:id',
                loadComponent:()=>import('./admin/dashboard/actualizar-herramienta/actualizar-herramienta.component').then(m=> m.ActualizarHerramientaComponent)
            },
            {
                path:'admin/dashboard/cart',
                loadComponent:()=> import('./admin/dashboard/cart-list/cart-list.component').then(m=> m.MostrarCartComponent)
            },
            {
                path:'admin/dashboard/cart-create',
                loadComponent:()=> import('./admin/dashboard/cart-create/cart-create.component').then(m=> m.CrearCartComponent)
            },
            {
                path:'admin/dashboard/cart-update/:id',
                loadComponent:()=> import('./admin/dashboard/cart-update/cart-update.component').then(m=> m.ActualizarCartComponent)
            },
            {
                path:'admin/dashboard/cart-detail',
                loadComponent:()=> import('./admin/dashboard/cart-detail-list/cart-detail-list.component').then(m=> m.CartDetailListComponent)
            },
            {
                path:'admin/dashboard/cart-detail-create',
                loadComponent:()=> import('./admin/dashboard/cart-detail-create/cart-detail-create.component').then(m=> m.CartDetailCreateComponent)
            },
            {
                path:'admin/dashboard/cart-detail-update/:id',
                loadComponent:()=> import('./admin/dashboard/cart-detail-update/cart-detail-update.component').then(m=> m.CartDetailUpdateComponent)
            },
            {
                path:'admin/dashboard/ventas',
                loadComponent:()=> import('./admin/dashboard/venta-list/venta-list.component').then(m=> m.VentaListComponent)
            },
            {
                path:'admin/dashboard/venta-create',
                loadComponent:()=> import('./admin/dashboard/venta-create/venta-create.component').then(m=> m.VentaCreateComponent)
            },
            {
                path:'admin/dashboard/venta-update/:id',
                loadComponent:()=> import('./admin/dashboard/venta-update/venta-update.component').then(m=> m.VentaUpdateComponent)
            }
        ]

    },
    {
        path:'**',
        component:NotfoundComponent
    }
];
