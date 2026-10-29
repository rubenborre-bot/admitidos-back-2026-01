import { Router } from "express";
import { listarProgramas, obtenerProgramasPorId, crearPrograma, actualizarPrograma, eliminarPrograma } from "./programas.controller.js";
const router = Router();
router.get("/show", listarProgramas);
router.get("/info/:id", obtenerProgramasPorId);
router.post("/create", crearPrograma);
router.put("/update/:id", actualizarPrograma);
router.delete("/delete/:id", eliminarPrograma)
export default router;
