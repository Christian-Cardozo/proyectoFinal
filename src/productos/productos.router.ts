import express, { Request, Response } from "express";
import * as ProductoService from "./productos.service";
import { BaseProducto, Producto } from "./producto.interface";

export const productosRouter = express.Router();

// GET productos

productosRouter.get("/", async (req: Request, res: Response) => {
  try {
    const productos: Producto[] = await ProductoService.findAll();

    res.status(200).send(productos);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// GET productos/:id

productosRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const producto: Producto = await ProductoService.find(id);

    if (producto) {
      return res.status(200).send(producto);
    }

    res.status(404).send("Producto no encontrado");
  } catch (error:any) {
    res.status(500).send(error.message);
  }
});

// POST productos

productosRouter.post("/", async (req: Request, res: Response) => {
  try {
    const producto: BaseProducto = req.body;

    const newProducto = await ProductoService.create(producto);

    res.status(201).json(newProducto);
  } catch (error:any) {
    res.status(500).send(error.message);
  }
});

// PUT productos/:id

productosRouter.put("/:id", async (req: Request, res: Response) => {
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
});

// DELETE productos/:id

productosRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await ProductoService.remove(id);

    res.sendStatus(204);
  } catch (error:any) {
    res.status(500).send(error.message);
  }
});