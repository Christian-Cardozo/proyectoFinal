import { Productos } from './../productos/productos.interface';

export interface BaseCarrito {
    timestamp: Date;
    productos: Productos[]    
  }
  
  export interface Carrito extends BaseCarrito {
    id: number;
  }