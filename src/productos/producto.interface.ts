export interface BaseProducto {
    timestamp: Date;
    nombre: string;
    descripcion: string;
    codigo: string;
    foto: string;
    precio: number;
    stock: number;
  }
  
  export interface Producto extends BaseProducto {
    id: number;
  }