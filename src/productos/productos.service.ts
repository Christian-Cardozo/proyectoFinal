import { Producto, BaseProducto } from './producto.interface';
import { Productos } from './productos.interface';

let productos: Productos = {
  1: {
    id: 1,
    timestamp: new Date(),
    nombre: "Smart Tv",
    descripcion: "Smart Tv Noblex Dk43x5100 Led Full Hd 43",
    codigo: "SKU9553",
    foto: "smarttv.jpg", 
    precio: 38999,
    stock: 200
  },
  2: {
    id: 2,
    timestamp: new Date(),
    nombre: "Notebook",
    descripcion: "Notebook Exo Xq3c-s3582 Intel I3-10ma 8gb Ssd 256gb 15,6 W10",
    codigo: "SKU5221",
    foto: "notebook.jpg", 
    precio: 88346,
    stock: 120
  },
  3: {
    id: 3,
    timestamp: new Date(),
    nombre: "Smartphone",
    descripcion: "LG K61 128 GB titanio 4 GB RAM",
    codigo: "SKU7777",
    foto: "smartphone.jpg", 
    precio: 31999,
    stock: 18
  },
};

export const findAll = async (): Promise<Producto[]> => Object.values(productos);

export const find = async (id: number): Promise<Producto> => productos[id];

export const create = async (newItem: BaseProducto): Promise<Producto> => {
  const id = new Date().valueOf();

  productos[id] = {
    id,
    ...newItem,
  };

  return productos[id];
};

export const update = async (id: number, productoUpdate: BaseProducto): Promise<Producto | null> => {
  
  const producto = await find(id);

  if (!producto) {
    return null;
  }

  productos[id] = { id, ...productoUpdate };

  return productos[id];
};

export const remove = async (id: number): Promise<null | void> => {
  const producto = await find(id);

  if (!producto) {
    return null;
  }

  delete productos[id];
};
