import express, { Application, Request, Response } from "express";
import { productosRouter } from './productos/productos.router';
import { carritoRouter } from './carrito/carrito.router';

const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritoRouter);

app.get(
    "/",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "Hello World!",
        });
    }
);

try {
    app.listen(port, (): void => {
        console.log(`Conectado al puerto ${port}`);
    });
} catch (error: any) {
    console.error(`Error: ${error.message}`);
}