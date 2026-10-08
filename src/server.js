import express from "express";

const app = express();
app.use(express.json());
const PORT = Number(process.env.PORT) || 3000;
const HOST= process.env.HOST;
const APP_NAME= process.env.APP_NAME;
app.get("/api/health", (req, res)=>{
    res.json({status: "ok",
        success: true,
        message: "API functioning correctly",
        version: "1.0.0"
    });
});
const facultades=[
    {id:1, name: "Facultad de ingenieria"},
    {id:2, name: "Facultad de ciencias sociales" },
    {id:3, name: "Facultad de ciencias de salud"},
     {id:4, name: "Facultad de arquitectura"}
]
let nexProgramaId = 5;
const programas=[
    {id:1,codigo: "IS", name: "Facultad de ingenieria", nivel: "pregrado", createBy: "System", createdAt: new Date().toISOString()},
     {id:2,codigo: "IC", name: "Facultad de ciencias sociales", nivel: "pregrado", createBy: "System", createdAt: new Date().toISOString()},
     {id:3,codigo: "II", name: "Facultad de ciencias de salud", nivel: "pregrado", createBy: "System", createdAt: new Date().toISOString()}
]
app.get("/api/facultades", (req, res)=>{
    res.json({statusCode: 200,
        data: facultades
    });
});
app.get("/api/programas", (req, res)=>{
    res.json({statusCode: 200,
        data: programas
    });
});
app.post("/api/programas/store", (req, res)=>{
    console.log(req.body);
    res.json({statusCode: 201,
        success : true,
        recibido: req.body
    });
});
app.listen(PORT, HOST, ()=>{
    console.log(APP_NAME);
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
