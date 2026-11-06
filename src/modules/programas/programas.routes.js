import { Router } from "express";
import { listarProgramas, obtenerProgramasPorId, crearPrograma, actualizarPrograma, eliminarPrograma } from "./programas.controller.js";
const ProgramasRouter = Router();
ProgramasRouter.get("/show", listarProgramas);
ProgramasRouter.get("/info/:id", obtenerProgramasPorId);
ProgramasRouter.post("/create", crearPrograma);
ProgramasRouter.put("/update/:id", actualizarPrograma);
ProgramasRouter.delete("/delete/:id", eliminarPrograma)
export default ProgramasRouter;
