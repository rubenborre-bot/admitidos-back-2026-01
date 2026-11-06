import mongoose from 'mongoose';
import * as EstudiantesService from './estudiantes.service.js'
import { obtenerProgramasPorId } from '../programas/programas.service.js';


export async function listarEstudiantes(req, res) {
    try{
        const estudiantes = await EstudiantesService.listarEstudiantes();
        res.json({
            statusCode : 200,
            success: true,
            message: 'Estudiantes listados correctamente',
            data: estudiantes
        });
    } catch(error){
        console.error(error);
        res.status(500).json({
            statusCode : 500,
            success: false,
            message: 'Error al listar los estudiantes',
        });
    }
}
export async function obtenerEstudiantePorId(req, res) {
    const id = req.params.id;
    
    try{
        if(!mongoose.isValidObjectId(id) || id<= 0){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "ID de estudiante invalido"
            })
        }
       const estudiante = await EstudiantesService.obtenerEstudiantePorId(id);
       if(!estudiante){
        return res.status(404).json({
            statusCode: 404,
            success: false,
            message: 'Estudiante no encontrado'
        });
       }
        res.json({
            statusCode: 200,
            success: true,
            message: 'Estudiante obtenido correctamente',
            data: estudiante
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            statusCode:500,
            success: false,
            message: "error al obtener estudiante"
        })
    }
}
export async function crearEstudiante(req, res) {
    try{
        const {name} = req.body;
        const {programa_id} = req.body;
        const {codigo} = req.body;
        if(name === undefined || programa_id === undefined || codigo === undefined){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "El campo 'name', 'programa_id' y 'codigo' son obligatorios"
            });
        }
        if(name.length < 3 && name.length > 150){
                return res.status(400).json({
                    statusCode: 400,
                    success: false,
                    message: "El campo 'name' debe tener entre 3 y 150 caracteres"
                })
            }
        if(!mongoose.isValidObjectId(programa_id) || programa_id<= 0){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "ID de programa invalido"
            })
        }
        const programa = await obtenerProgramasPorId(programa_id);
        if(programa != null){
            
            const estudiante = await EstudiantesService.crearEstudiante(name, programa_id, codigo);
            res.status(201).json({
                statusCode: 201,
                success: true,
                message: 'Estudiante creado correctamente',
                data: estudiante,

            });
        }else{
            
                res.status(404).json({
                success: false,
                message: "Programa no encontrado, ingrese un programa valido"
        })
        }
    }catch(error){
            console.error(error);
            res.status(500).json({
                statusCode: 500,
                message: "Error al crear estudiante",
                success: false
            })
        }
}
export async function actualizarEstudiante(req, res) {
    try{
        const id = req.params.id
        const {name} = req.body;
        const {programa_id} = req.body;
        const {codigo} = req.body;
        if(!mongoose.isValidObjectId(id) || id<=0){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "El id del estudiante es invalido"
            });
        }
        if(name === undefined || programa_id === undefined || codigo === undefined){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "El campo 'name', 'programa_id' y 'codigo' son obligatorios"
            });
         }
        if(name.length < 3 && name.length > 150){
                return res.status(400).json({
                    statusCode: 400,
                    success: false,
                    message: "El campo 'name' debe tener entre 3 y 150 caracteres"
                })
            }
        if(!mongoose.isValidObjectId(programa_id) || id<=0){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "El id de programa es invalido"
            });
        }
        const programa = await obtenerProgramasPorId(programa_id);
        if(programa != null){
        const estudianteActual = await EstudiantesService.obtenerEstudiantePorId(id);
        if(!estudianteActual){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "estudiante no encontrado"
            });
        }
        
            
            const estudiante = await EstudiantesService.actualizarEstudiante(id, name, programa_id, codigo);
            res.status(201).json({
                statusCode: 201,
                success: true,
                message: 'Estudiante actualizado correctamente',
                data: estudiante,

            });
           }else{
            
                res.status(404).json({
                success: false,
                message: "Programa no encontrado, ingrese un programa valido"
        })
        } 

        }catch(error){
            console.error(error);
            res.status(500).json({
                statusCode: 500,
                message: "Error al actualizar el estudiante",
                success: false
            })
        }
}
export async function eliminarEstudiante(req, res) {
    try{
        const id = req.params.id;
         if(!mongoose.isValidObjectId(id) || id<=0){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "El id de estudiante es invalido"
            });
        }
        const estudianteActual = await EstudiantesService.obtenerEstudiantePorId(id);
        if(!estudianteActual){
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Estudiante no encontrado"
            });
        }
        const estudiante = await EstudiantesService.eliminarEstudiante(id);
        res.status(201).json({
            statusCode: 201,
            success: true,
            message: "Estudiante eliminado correctamente",
        });
    }catch(error){
         console.error(error)
        res.status(500).json({
          statusCode: 500,
          message: "Error al eliminar el estudiante", 
           success: false,
        })
    }

    
}