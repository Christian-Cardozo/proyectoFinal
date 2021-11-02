import { Producto } from './../productos/producto.interface';
import { Productos } from './../productos/productos.interface';
import express, { Request, Response } from "express";
import * as CarritoService from "./carrito.service";
import { BaseCarrito, Carrito } from "./carrito.interface";

export const carritoRouter = express.Router();

// GET carrito/:id/productos
carritoRouter.get("/:id/productos", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const carrito: Carrito = await CarritoService.find(id);

    if (carrito) {
      return res.status(200).send(carrito.productos);
    }

    res.status(404).send("Carrito no encontrado");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// POST carrito
carritoRouter.post("/", async (req: Request, res: Response) => {
  try {

    const newCarrito = await CarritoService.create();

    res.status(201).json(newCarrito);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// POST carrito/:id/productos
carritoRouter.post("/:id/productos", async (req: Request, res: Response) => {
  try {

    const id: number = parseInt(req.params.id, 10);
    const productos_id: number[] = req.body;

    const updatedCarrito:unknown = await CarritoService.addProducts(id, productos_id)

    if (updatedCarrito) {
      return res.status(200).json(updatedCarrito);
    }

    res.status(404).send("Carrito no encontrado");

  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// DELETE carrito/:id
carritoRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const idRemoved:unknown = await CarritoService.remove(id);    
    
    if(idRemoved == null){
      return res.status(404).send(`Carrito no encontrado`);
    }

    res.status(202).send(`Carrito con id: ${idRemoved} Eliminado correctamente`);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// DELETE carrito/:id/productos/:id_prod
carritoRouter.delete("/:id/productos/:id_prod", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const id_prod: number = parseInt(req.params.id_prod, 10);

    const idRemoved = await CarritoService.removeProductById(id, id_prod);

    if(idRemoved == null){
      return res.status(404).send(`Carrito no encontrado`);
    }
    
    res.status(202).send(`Producto con id: ${idRemoved} eliminado correctamente`);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});