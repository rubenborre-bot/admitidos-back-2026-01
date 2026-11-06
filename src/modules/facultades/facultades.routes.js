import { Router } from "express";
import { listarFacultades, obtenerFacultadPorId, crearFacultad, eliminarFacultad, actualizarFacultad } from "./facultades.controller.js";
const FacultadesRouter = Router();
FacultadesRouter.get("/show", listarFacultades);
FacultadesRouter.get("/info/:id", obtenerFacultadPorId);
FacultadesRouter.post("/create", crearFacultad);
FacultadesRouter.put("/update/:id", actualizarFacultad);
FacultadesRouter.delete("/delete/:id", eliminarFacultad)
export default FacultadesRouter;
