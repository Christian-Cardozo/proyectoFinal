import { Carrito, BaseCarrito } from './carrito.interface';

let carrito: Carrito;

export const find = async (id: number): Promise<Carrito> => carrito[id];

export const create = async (newCarrito: BaseCarrito): Promise<Carrito> => {
  const id = new Date().valueOf();

  carrito = {
    id,
    ...newCarrito,
  };

  return carrito[id];
};

/* export const update = async (id: number, carritoUpdate: BaseCarrito): Promise<Carrito | null> => {
  
  const producto = await find(id);

  if (!producto) {
    return null;
  }

  productos[id] = { id, ...productoUpdate };

  return productos[id];
}; */

export const remove = async (id: number): Promise<null | void> => {
  const carrito = await find(id);

  if (!carrito) {
    return null;
  }

  delete carrito[id];
};
