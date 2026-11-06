import { Router } from "express";
import { listarEstudiantes, obtenerEstudiantePorId, crearEstudiante, actualizarEstudiante, eliminarEstudiante } from "./estudiantes.controller.js";
const EstudiantesRouter = Router();
EstudiantesRouter.get("/show", listarEstudiantes);
EstudiantesRouter.get("/info/:id", obtenerEstudiantePorId);
EstudiantesRouter.post("/create", crearEstudiante);
EstudiantesRouter.put("/update/:id", actualizarEstudiante);
EstudiantesRouter.delete("/delete/:id", eliminarEstudiante)
export default EstudiantesRouter;
