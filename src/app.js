import express from 'express';
import FacultadesRouter from './modules/facultades/facultades.routes.js';
import ProgramasRouter from  "./modules/programas/programas.routes.js";
import EstudiantesRouter from './modules/estudiantes/estudiantes.routes.js';
import router from './modules/autenticacion/autenticacion.routes.js';
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/facultades", FacultadesRouter);
app.use("/api/programas", ProgramasRouter);
app.use("/api/estudiantes", EstudiantesRouter)
app.use("/api/autenticacion", router);

app.get("/api/health", (req, res)=>{
    res.json({status: "ok",
        success: true,
        message: "API functioning correctly",
        version: "1.0.0"
    });
});
export default app;