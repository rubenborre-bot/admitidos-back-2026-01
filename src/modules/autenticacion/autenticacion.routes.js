import { Router } from "express";
import { registrar, acceso, perfil } from "./autenticacion.Controller.js";
import autenticacionMiddleware from "./autenticacion.middleware.js";
const router = Router()

router.post("/registrar", registrar);

router.post("/inicio-sesion", acceso);

router.get("/perfil", autenticacionMiddleware, perfil);

export default router;
 