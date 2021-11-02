import { Producto } from './../productos/producto.interface';
import { Carritos } from './carritos.interface';
import { Carrito, BaseCarrito } from './carrito.interface';
import * as ProductoService from "../productos/productos.service";

let bdCarrito: Carritos = {};

export const find = async (id: number): Promise<Carrito> => {

  return bdCarrito[id]
};

export const create = async (): Promise<Carrito> => {
  const id = new Date().valueOf();
  const now = new Date(Date.now());

  const carrito: BaseCarrito = {
    timestamp: now,
    productos: []
  };

  bdCarrito[id] = {
    id,
    ...carrito,
  };

  return bdCarrito[id];
};

export const addProducts = async (id: number, productos_id: number[]): Promise<Carrito | null> => {

  const existingCarrito: Carrito = await find(id)
  const allproductos: Producto[] = await ProductoService.findAll()

  const productos: Producto[] = allproductos.filter(producto => productos_id.includes(producto.id))

  if (existingCarrito) {

    existingCarrito.productos.push(...productos);
    const updatedCarrito = await update(id, existingCarrito);
    return updatedCarrito
  }

  return null
}

export const remove = async (id: number): Promise<number | null> => {
  const carrito = await find(id);

  if (!carrito) {
    return null;
  }

  delete bdCarrito[id];
  return id
};

export const removeProductById = async (id: number, id_prod: number): Promise<number | null> => {
  const carrito = await find(id);

  if (!carrito) {
    return null;
  }

  const productos:Producto[] = bdCarrito[id].productos;

  const newProductos:Producto[] = productos.filter( producto => producto.id != id_prod)

  bdCarrito[id].productos = newProductos;
  
  return id_prod
};

export const update = async (id: number, carritoUpdate: BaseCarrito): Promise<Carrito | null> => {

  const carrito = await find(id);

  if (!carrito) {
    return null;
  }

  bdCarrito[id] = { id, ...carritoUpdate };

  return bdCarrito[id];

};
