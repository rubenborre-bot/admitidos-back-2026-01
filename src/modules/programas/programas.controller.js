import mongoose from 'mongoose';
import * as ProgramasService from './programas.service.js'
import { obtenerFacultadPorId } from '../facultades/facultades.service.js';


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
            message: 'Error al listar los programas',
        });
    }
}
export async function obtenerProgramasPorId(req, res) {
    const id = req.params.id;
    
    try{
        if(!mongoose.isValidObjectId(id) || id<= 0){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "ID de programa invalido"
            })
        }
       const programa = await ProgramasService.obtenerFacultadPorId(id);
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
            message: 'Programa obtenida correctamente',
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
        const {name} = req.body;
        const {facultad_id} = req.body;
        const {codigo} = req.body;
        if(name === undefined || facultad_id === undefined || codigo === undefined){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "El campo 'name', 'facultad_id' y 'codigo' son obligatorios"
            });
        }
        if(name.length < 3 && name.length > 150){
                return res.status(400).json({
                    statusCode: 400,
                    success: false,
                    message: "El campo 'name' debe tener entre 3 y 150 caracteres"
                })
            }
        if(!mongoose.isValidObjectId(facultad_id) || facultad_id<= 0){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "ID de facultad invalido"
            })
        }
        const facultad = await obtenerFacultadPorId(facultad_id);
        if(facultad != null){
            
            const programa = await ProgramasService.crearProgramas(name, facultad_id, codigo);
            res.status(201).json({
                statusCode: 201,
                success: true,
                message: 'Programa creado correctamente',
                data: programa,

            });
        }else{
            
                res.status(404).json({
                success: false,
                message: "Facultad no encontrada, ingrese una facultad valida"
        })
        }
    }catch(error){
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
        const id = req.params.id
        const {name} = req.body;
        const {facultad_id} = req.body;
        const {codigo} = req.body;
        if(!mongoose.isValidObjectId(id) || id<=0){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "El id de programa es invalido"
            });
        }
        if(name === undefined || facultad_id === undefined || codigo === undefined){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "El campo 'name', 'facultad_id' y 'codigo' son obligatorios"
            });
         }
        if(name.length < 3 && name.length > 150){
                return res.status(400).json({
                    statusCode: 400,
                    success: false,
                    message: "El campo 'name' debe tener entre 3 y 150 caracteres"
                })
            }
        if(!mongoose.isValidObjectId(facultad_id) || id<=0){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "El id de facultad es invalido"
            });
        }
        const facultad = await obtenerFacultadPorId(facultad_id);
        if(facultad != null){
        const programaActual = await ProgramasService.obtenerProgramasPorId(id);
        if(!programaActual){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "programa no encontrada"
            });
        }
        
            
            const programa = await ProgramasService.actualizarPrograma(id, name, facultad_id, codigo);
            res.status(201).json({
                statusCode: 201,
                success: true,
                message: 'Programa actualizado correctamente',
                data: programa,

            });
           }else{
            
                res.status(404).json({
                success: false,
                message: "Facultad no encontrada, ingrese una facultad valida"
        })
        } 

        }catch(error){
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
        const id = req.params.id;
         if(!mongoose.isValidObjectId(id) || id<=0){
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