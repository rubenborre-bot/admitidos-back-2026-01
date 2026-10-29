import * as ProgramasService from './programas.service.js'
export async function listarProgramas(req, res) {
    try{
        const programas = await ProgramasService.listarProgramas();
        res.json({
            statusCode : 200,
            success: true,
            message: 'Programas listados correctamente',
            data: programas
        });
    } catch(error){
        console.error(error);
        res.status(500).json({
            statusCode : 500,
            success: false,
            message: 'Error al listar las Programas',
        });
    }
}
export async function obtenerProgramasPorId(req, res) {
    const id = Number(req.params.id);
    
    try{
        if(!Number.isInteger(id) || id<= 0){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "ID de programa invalido"
            })
        }
       const programa = await ProgramasService.obtenerProgramasPorId(id);
       if(!programa){
        return res.status(404).json({
            statusCode: 404,
            success: false,
            message: 'Programa no encontrado'
        });
       }
        res.json({
            statusCode: 200,
            success: true,
            message: 'Programa obtenido correctamente',
            data: programa
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            statusCode:500,
            success: false,
            message: "error al obtener programa"
        })
    }
}
export async function crearPrograma(req, res) {
    try{
        const {name, facultad_id, codigo} = req.body;
        if (typeof name !== "string" || name.trim().length < 3 || name.trim().length > 150) {
    return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "El campo 'name' es obligatorio y debe tener entre 3 y 150 caracteres"
    });
}
 const facultadId = Number(facultad_id);
        if (!Number.isInteger(facultadId) || facultadId <= 0) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "El campo 'facultad_id' es obligatorio y debe ser un entero positivo"
            });
        }
if (typeof codigo !== "string" || codigo.trim().length === 0) {
    return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "El campo 'codigo' es obligatorio"
    });
}
            const programa = await ProgramasService.crearPrograma(name.trim(), facultadId, codigo.trim());
            res.status(201).json({
                statusCode: 201,
                success: true,
                message: 'Programa creado correctamente',
                data: programa,

            });
        }
    catch(error){
            console.error(error);
            res.status(500).json({
                statusCode: 500,
                message: "Error al crear el programa",
                success: false
            })
        }
}
export async function actualizarPrograma(req, res) {
    try{
        const id = Number(req.params.id)
        const {name} = req.body;
        if(!Number.isInteger(id) || id<=0){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "El id de programa es invalido"
            });
        }
        const ProgramaActual = await ProgramasService.obtenerProgramasPorId(id);
        if(!ProgramaActual){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Programa no encontrado"
            });
        }
       if (typeof name !== "string" || name.trim().length < 3 || name.trim().length > 150) {
    return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "El campo 'name' es obligatorio y debe tener entre 3 y 150 caracteres"
    });
}
            const programa = await ProgramasService.actualizarPrograma(id, name);
            res.status(201).json({
                statusCode: 201,
                success: true,
                message: 'Programa actualizado correctamente',
                data: programa,

            });
        }
    catch(error){
            console.error(error);
            res.status(500).json({
                statusCode: 500,
                message: "Error al actualizar el programa",
                success: false
            })
        }
}
export async function eliminarPrograma(req, res) {
    try{
        const id = Number(req.params.id);
         if(!Number.isInteger(id) || id<=0){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "El id de programa es invalido"
            });
        }
        const programaActual = await ProgramasService.obtenerProgramasPorId(id);
        if(!programaActual){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Programa no encontrado"
            });
        }
        const programa = await ProgramasService.eliminarPrograma(id);
        res.status(201).json({
            statusCode: 201,
            success: true,
            message: "Programa eliminado correctamente",
            data: programaActual
        });
    }catch(error){
         console.error(error)
        res.status(500).json({
          statusCode: 500,
          message: "Error al eliminar el programa", 
           success: false,
        })
    }

    
}