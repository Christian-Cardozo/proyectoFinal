import express, { Request, Response } from "express";
import * as CarritoService from "./carrito.service";
import { BaseCarrito, Carrito } from "./carrito.interface";

export const carritoRouter = express.Router();

// GET carrito/:id

carritoRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const carrito: Carrito = await CarritoService.find(id);

    if (carrito) {
      return res.status(200).send(carrito);
    }

    res.status(404).send("Carrito no encontrado");
  } catch (error:any) {
    res.status(500).send(error.message);
  }
});

// POST carrito

carritoRouter.post("/", async (req: Request, res: Response) => {
  try {
    const carrito: BaseCarrito = req.body;
    
    const newCarrito = await CarritoService.create(carrito);

    res.status(201).json(newCarrito);
  } catch (error:any) {
    res.status(500).send(error.message);
  }
});

// PUT items/:id

/* productosRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const productoUpdate: Producto = req.body;

    const existingProducto: Producto = await ProductoService.find(id);

    if (existingProducto) {
      const updatedProducto = await ProductoService.update(id, productoUpdate);
      return res.status(200).json(updatedProducto);
    }

    const newProducto = await ProductoService.create(productoUpdate);

    res.status(201).json(newProducto);
  } catch (error:any) {
    res.status(500).send(error.message);
  }
}); */

// DELETE items/:id

carritoRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await CarritoService.remove(id);

    res.sendStatus(204);
  } catch (error:any) {
    res.status(500).send(error.message);
  }
});