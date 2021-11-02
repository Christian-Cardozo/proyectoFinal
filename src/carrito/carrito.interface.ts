import { Producto } from './../productos/producto.interface';

export interface BaseCarrito {
    timestamp: Date;
    productos: Producto[]    
  }
  
  export interface Carrito extends BaseCarrito {
    id: number;
  }