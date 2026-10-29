import * as FacultadesService from './facultades.service.js'
export async function listarFacultades(req, res) {
    try{
        const facultades = await FacultadesService.listarFacultades();
        res.json({
            statusCode : 200,
            success: true,
            message: 'Facultades listadas correctamente',
            data: facultades
        });
    } catch(error){
        console.error(error);
        res.status(500).json({
            statusCode : 500,
            success: false,
            message: 'Error al listar las facultades',
        });
    }
}
export async function obtenerFacultadPorId(req, res) {
    const id = Number(req.params.id);
    
    try{
        if(!Number.isInteger(id) || id<= 0){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "ID de facultad invalido"
            })
        }
       const facultad = await FacultadesService.obtenerFacultadPorId(id);
       if(!facultad){
        return res.status(404).json({
            statusCode: 404,
            success: false,
            message: 'Facultad no encontrada'
        });
       }
        res.json({
            statusCode: 200,
            success: true,
            message: 'Facultad obtenida correctamente',
            data: facultad
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            statusCode:500,
            success: false,
            message: "error al obtener facultad"
        })
    }
}
export async function crearFacultad(req, res) {
    try{
        const {name} = req.body;
        if(name === undefined){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "El campo 'name' es obligatorio"
            });
        }
            if(name.length < 3 && name.length > 150){
                return res.status(400).json({
                    statusCode: 400,
                    success: false,
                    message: "El campo 'name' debe tener entre 3 y 150 caracteres"
                })
            }
            const facultad = await FacultadesService.crearFacultad(name);
            res.status(201).json({
                statusCode: 201,
                success: true,
                message: 'Facultad creada correctamente',
                data: facultad,

            });
        }
    catch(error){
            console.error(error);
            res.status(500).json({
                statusCode: 500,
                message: "Error al crear la facultad",
                success: false
            })
        }
}
export async function actualizarFacultad(req, res) {
    try{
        const id = Number(req.params.id)
        const {name} = req.body;
        if(!Number.isInteger(id) || id<=0){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "El id de facultad es invalido"
            });
        }
        const facultadActual = await FacultadesService.obtenerFacultadPorId(id);
        if(!facultadActual){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Facultad no encontrada"
            });
        }
        if(name === undefined){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "El campo 'name' es obligatorio"
            });
        }
            if(name.length < 3 && name.length > 150){
                return res.status(400).json({
                    statusCode: 400,
                    success: false,
                    message: "El campo 'name' debe tener entre 3 y 150 caracteres"
                })
            }
            const facultad = await FacultadesService.actualizarFacultad(id, name);
            res.status(201).json({
                statusCode: 201,
                success: true,
                message: 'Facultad actualizada correctamente',
                data: facultad,

            });
        }
    catch(error){
            console.error(error);
            res.status(500).json({
                statusCode: 500,
                message: "Error al crear la facultad",
                success: false
            })
        }
}
export async function eliminarFacultad(req, res) {
    try{
        const id = Number(req.params.id);
         if(!Number.isInteger(id) || id<=0){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "El id de facultad es invalido"
            });
        }
        const facultadActual = await FacultadesService.obtenerFacultadPorId(id);
        if(!facultadActual){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Facultad no encontrada"
            });
        }
        const facultad = await FacultadesService.eliminarFacultad(id);
        res.status(201).json({
            statusCode: 201,
            success: true,
            message: "Facultad eliminada correctamente",
            data: facultadActual
        });
    }catch(error){
         console.error(error)
        res.status(500).json({
          statusCode: 500,
          message: "Error al eliminar la facultad", 
           success: false,
        })
    }

    
}